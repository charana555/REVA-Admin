import React ,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo192.png'
import {HiMenu} from "react-icons/hi"

import { useAuth } from '../Context/AuthContext'

const Navbar = () => {

  const [toggle , setToggle] = useState(false);
  const { Logout } = useAuth();

  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      await Logout();
      navigate("/")
    } catch  {
      window.alert("Failed to login");
    }
  }

  return (
    <nav className=' bg-gray-900 py-1 ' >
      <div className=' mx-auto flex justify-between items-center py-2' >
        <div className=' flex '>
          <img className=' mx-3 ' src={logo} alt="Logo" height="30" width="30" />
          <h1 className='  text-white text-xl px-2' >REVA Health App</h1>
        </div>
        <div className=' hidden md:flex ' >
          <Link className=' text-white px-3 hover:text-gray-300 ' to="/test" >Tests</Link>
          <Link className=' text-white px-3 hover:text-gray-300 ' to="/appointments" >Appointments</Link>
          <Link className=' text-white px-3 hover:text-gray-300 ' to="/docters" >Docters</Link>
        </div>
        <div className=' hidden md:flex ' >
          <button onClick={handlelogout} className=' border border-red-600 text-red-600 mx-4 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition duration-300' >Logout</button>
        </div>
        <div className='flex text-2xl text-white md:hidden '>
            <button className=' hover:text-gray-300 mx-4 ' onClick={() => setToggle(pre => !pre)} ><HiMenu /></button>
        </div> 
      </div>
      {
        toggle && 
        <div className=' text-center md:hidden ' >
            <Link className=' text-white px-3 hover:text-gray-300 block py-3' to="/test" >Tests</Link>
            <Link className=' text-white px-3 hover:text-gray-300 block py-3' to="/appointments" >Appointments</Link>
            <Link className=' text-white px-3 hover:text-gray-300 block py-3' to="/docters" >Docters</Link>
            <div>
            <button onClick={handlelogout} className=' border border-red-600 text-red-600 mx-3 my-2 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition duration-300 ' >Logout</button>
            </div>
        </div>
      }
    </nav>
  )
}

export default Navbar