import express from 'express';
import User from './models/signUpForm.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const userExists = await User.findOne(email)
    if (userExists) {
      return res.status(400).json({ message: "Usere already exists" });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" })
    }
    const user = await User.findOne({ email });
    if (!User || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

// router.get('/me', protect, async (req, res)=> {
//   res.status(200).json(req.user)
// })


export default router;