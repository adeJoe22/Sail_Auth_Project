const { model, Schema } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    firstName: {
      type: String,
      required: [true, 'Please provide your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide your last name'],
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      validator: [isEmail, 'Please provide a valid email'],
    },
  },
  {
    timestamps: true,
  }
);

const User = model('Users', userSchema);
module.exports = User;
