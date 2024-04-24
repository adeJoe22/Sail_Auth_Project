const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 12);

    // check if email was exist
    const checkEmail = await User.exists({ email });
    if (checkEmail !== null) {
      return res.status(400).json({ message: 'Email has been taken' });
    }
    // create user
    const newUser = new User({
      password: hash,
      email,
      firstName,
      lastName,
    });

    await newUser?.save();

    return res.status(201).json({ message: 'Successfully signup' });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });

  if (!checkUser) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  await bcrypt.compare(password, checkUser?.password);
  const payload = {
    email: checkUser.email,
    id: checkUser._id,
  };
  const token = jwt.sign(payload, 'authsecretforsail', {
    expiresIn: '1d',
  });
  const data = {
    email: checkUser.email,
    token,
  };
  try {
    return res
      .status(201)
      .json({ message: 'Successfully logged in', data });
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById({ _id: id }).select('-password');

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signUp, login, getUser, getUsers };
