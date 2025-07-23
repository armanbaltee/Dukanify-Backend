const client = require('../../config/passport');
const User = require('../../model/SignUpModel');


exports.googleLogin = async (req, res) => {
  const { token, action } = req.body;

  if (!['signin', 'signup'].includes(action)) {
    return res.status(400).json({ success: false, message: 'Invalid action' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, name, email, picture } = payload;

    let user = await User.findOne({ googleId });

    if (action === 'signup') {
      if (user) {
        return res.status(400).json({ success: false, message: 'User already exists. Please sign in.' });
      }

      user = await User.create({
        googleId,
        name,
        email,
        photo: picture
      });

      req.session.user = user;

      return res.status(201).json({
        success: true,
        user: {
          name: user.name,
          email: user.email
        }
      });
    }

    if (action === 'signin') {
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found. Please sign up.' });
      }

      req.session.user = user;

      return res.status(200).json({
        success: true,
        user: {
          name: user.name,
          email: user.email
        }
      });
    }

  } catch (error) {
    console.error('Google token verification failed:', error.message);
    res.status(401).json({ success: false, message: 'Invalid Google token' });
  }
};
