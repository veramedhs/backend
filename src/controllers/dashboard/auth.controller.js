import jwt from 'jsonwebtoken';
import User from '../../models/dashboard_model/user.model.js';
import { ENV } from '../../config/ENV.js';

const JWT_SECRET = ENV.JWT_SECRET;

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  try {
    const user = await User.findOne({ email }); 
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    if (ENV.ENVIRONMENT !== 'production') {
      console.error('Login error:', error);
    }
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    //The user ID is extracted from the authenticated token, so it's reliable
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    if (ENV.ENVIRONMENT !== 'production') {
      console.error('Fetch user data error:', error);
    }
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch user data' });
  }
};

export const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required',
    });
  }

  if(password.length < 6){
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long',
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User with this email already exists' });
    }
    const user = await User.create({ name, email, password, role: 'user' });
    res
      .status(201)
      .json({
        success: true,
        message: 'User added successfully',
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
  } catch (error) {
    if (ENV.ENVIRONMENT !== 'production') {
      console.error('Add user error:', error);
    }
    res.status(500).json({ success: false, message: 'Failed to add user' });
  }
};

// --- GET ALL USERS (Filtered for 'user' role) ---
// Route: router.get('/users', requireAuth, requireRole(['admin']), getAllUsers);
export const getAllUsers = async (req, res) => {
  try {
    // Find all users where the role is 'user' and exclude the password field.
    const users = await User.find({ role: 'user' }).select('-password');
    
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      users,
    });
  } catch (error) {
    if (ENV.ENVIRONMENT !== 'production') {
      console.error('Get all users error:', error);
    }
    res.status(500).json({ success: false, message: 'Failed to retrieve users' });
  }
};

// --- DELETE USER ---
// Route: router.delete('/users/:id', requireAuth, requireRole(['admin']), deleteUser);
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Optional: Prevent an admin from deleting themselves
    // if (user._id.toString() === req.user.id) {
    //   return res.status(400).json({ success: false, message: 'You cannot delete your own account.' });
    // }

    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    if (ENV.ENVIRONMENT !== 'production') {
      console.error('Delete user error:', error);
    }
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};