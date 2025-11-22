import { motion } from "framer-motion";
import { Link } from "react-router";

function Home() {

 return (
  <>
   <motion.div
      className="p-6"
      
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p className="mt-2 text-gray-600">
        Welcome to the home page with a smooth transition!
      </p>
      <div className="border ">
        User information
      </div>
      
    </motion.div>
  </>
 );
}

export default Home;
