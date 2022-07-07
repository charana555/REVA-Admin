import React ,{useRef , useState} from 'react'
import {Card , Form , Button, Alert ,Container} from "react-bootstrap"
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import  bgvideo from '../assets/revavideo.mp4'



const Signin = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { Signin } = useAuth()
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleInput(e) {
    e.preventDefault();
    try {  
        setLoading(true)
       await Signin(emailRef.current.value , passwordRef.current.value)
       navigate("/dash")
    } catch{
        setError("Invalid Credentials")
    }

    setLoading(false)
  }

  return (
   <>
   <Container className='d-flex align-items-centre justify-content-centre' style={{minHeight : "100vh"}}>
        <div className='w-100' style={{minwidth : "400px"}}>
     <Card className = 'w-100 '>
     <Card.Body className='w-50 m-auto'>
     <h2 className="text-centre mb-4">Sign In</h2>
            {error && <Alert varient="danger">{error}</Alert>}
            <Form onSubmit={handleInput}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required/>
                </Form.Group>
                <Form.Group id="password" className='mb-4'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required/>
                </Form.Group>
                <Button disabled = {loading} className='w-100' type='submit'>Sign In</Button>
            </Form> 
            </Card.Body>
            <div className='main'>
            <video src={bgvideo} autoPlay loop muted />
     </div>
     </Card>
     
     </div>
     </Container>
      </> 
  )
}

export default Signin

