//  const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  // Common fields
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  // For Google Login
  googleId: {
    type: String,
    unique: true,
    sparse: true  // Allows multiple nulls
  },

  // For Email/Password Login
  password: {
    type: String
  },
  otp: {
    type: String
  },
  otpExpires: {
    type: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  },

  // Optional photo field (for Google or profile image)
  photo: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};


module.exports = mongoose.model('User', userSchema);