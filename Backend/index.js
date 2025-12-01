import express from 'express';
import cors from 'cors';
import Emp from './models/employee.js';
import connectDB from './conn.js';
import mongoose from 'mongoose';

const PORT = 3000;
const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee")

app.post('/register', (req, res) => {
  const { name, email, pass } = req.body; // ensure these keys match your frontend
  Emp.create({ name, email, pass })
    .then(em => {
      console.log("New user registered:", em);
      res.json(em);
    })
    .catch(err => {
      console.error("Error registering user:", err);
      res.json(err);
    });
});


app.post('/login', (req, res) => {
  const { email, pass } = req.body;
  Emp.findOne({ email })
    .then(user => {
      if (!user) return res.json({ status: "error", msg: "No records" });

      if (user.pass === pass) return res.json({
        status: "Success",
        user: {
          name: user.name,
          email: user.email
        }
      });
      res.json("password is incorrect.");
    });
})

app.get("/tmdbApi", async (req, res) => {

})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
