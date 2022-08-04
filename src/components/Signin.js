import React ,{useRef , useState} from 'react'

import video from "../assets/revavideo.mp4"

import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'


const Signin = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { Signin } = useAuth()
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

    async function handleInput(e) {
      e.preventDefault();
      try {  
          setLoading(true)
        await Signin(emailRef.current.value , passwordRef.current.value)
        navigate("/test")
      } catch{
          window.alert("Invalid Credentials")
      }

      setLoading(false)
    }

  return (
    <section className=' w-screen h-[90vh] bg-gray-100 flex items-center justify-center ' >
      <div className=' min-w-[400px] bg-gray-600 shadow-xl '>
        <div className='w-100  ' >
        <video className='mx-auto my-6 bg-transparent' height="60" width="60" loop autoPlay muted><source src={video}/></video>
        </div>
        <h2 className='text-3xl text-white w-full text-center mb-4' >Login</h2>
          <div className='w-[90%] mx-auto '>
            <input className=' w-full py-2 rounded-full px-4 focus:outline-none my-3 '  placeholder= 'Email' ref={emailRef} type="email"/>
          </div>
          <div className='w-[90%] mx-auto '>
            <input className=' w-full py-2 rounded-full px-4 focus:outline-none my-3 '  placeholder= 'Password' ref={passwordRef} type="password" />
          </div>
        <div className='w-[90%] mx-auto py-5 '>
          <button disabled={loading} onClick={handleInput} className='w-full bg-orange-500 text-2xl text-white py-2 rounded-full hover:bg-orange-600 transition duration-300 ' >Login</button>
        </div>   
      </div>
</section>
  )
}

export default Signin

