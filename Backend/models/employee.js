import mongoose from "mongoose";

const empSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  pass: { 
    type: String,
  },
}, { timestamps: true });




const Emp = mongoose.model("employee", empSchema);

export default Emp;