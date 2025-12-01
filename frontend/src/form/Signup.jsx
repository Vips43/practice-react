import "./login.css"
import axios from 'axios'
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/register', {name, email, pass})
        .then(result => {
            console.log("Resgistred use: ",result)
            setTimeout(() => {
                navigate('/login')
            }, 1500);
        })
        .catch(error => console.log(error))
    }

  return (
    <>
    <form action="" onSubmit={handleSubmit}>
        <div className='main'>
            <div className='header'><h3>SignUp</h3></div>
            <div className='user'>
                <label htmlFor="username">username</label>
                <input type="text" name='user' placeholder='User name' onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='email'>
                <label htmlFor="username">email</label>
                <input type="email" name='email' placeholder='User email' onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className='pass'>
                <label htmlFor="username">password</label>
                <input type="password" name='password' placeholder='User password' onChange={(e)=> setPass(e.target.value)}/>
            </div>
            <div>
                <button className='btn'>SignUp</button>
            </div>
            <div className='foot'>
                <p>Already have an account? <Link to='/login'><span className='p-2 !text-blue-500'>LogIn</span></Link></p>
            </div>
        </div>
    </form>
    </>
  )
}

export default Signup;