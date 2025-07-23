const client = require('../../config/passport');
const User = require('../../model/SignUpModel');


exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub, name, email, picture } = payload;

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = await User.create({
        googleId: sub,
        name,
        email,
        photo: picture
      });
    }

    req.session.user = user;

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        // photo: user.photo
      }
    });

  } catch (error) {
    console.error('Google token verification failed:', error.message);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

exports.getCurrentUser = (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Failed to logout');
    res.clearCookie('connect.sid');
    res.status(200).json({ success: true, message: 'Logged out' });
  });
};
