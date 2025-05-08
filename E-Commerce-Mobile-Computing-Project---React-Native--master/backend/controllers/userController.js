const User = require('../models/userModel'); 

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address, city, country } = req.body;

    if (!name || !email || !password || !address || !city || !country) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ name, email, password, country, address, city });
    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({ message: 'User created successfully', user: userResponse });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ message: 'Login successful', user: userResponse });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


