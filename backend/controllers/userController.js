import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      ssn: user.ssn,
      image: user.image,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.ssn = req.body.ssn || user.ssn;
    user.image = req.body.image || user.image;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      ssn: updatedUser.ssn,
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments();

  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.ssn = req.body.ssn || user.ssn;
    user.image = req.body.image || user.image;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      ssn: updatedUser.ssn,
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Create a user
// @route   POST /api/users/createuser
// @access  Private/Admin

const createUser = asyncHandler(async (req, res) => {
  const user = new User({
    name: 'Sample name',
    email: 'sample@example.com',
    password: '123456',
    address: '',
    ssn: '',
    image: '/images/sample.jpg',
    isAdmin: false
  });

  const createdUser = await user.save();
  res.status(201).json(createdUser);

  // const { name, email, password, address, ssn, image, isAdmin } = req.body;

  // const userExists = await User.findOne({ email });

  // if (userExists) {
  //   res.status(400);
  //   throw new Error('User already exists');
  // }

  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  //   address,
  //   ssn,
  //   image,
  //   isAdmin
  // });

  // if (user) {
  //   res.status(201).json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     address: user.address,
  //     ssn: user.ssn,
  //     image: user.image,
  //     isAdmin: user.isAdmin
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error('Invalid user data');
  // }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser
};
