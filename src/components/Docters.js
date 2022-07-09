import React ,{ useState , useEffect} from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { Button ,Container , Nav , Navbar , Form , Alert  } from "react-bootstrap"
import { useAuth } from '../Context/AuthContext'
import { Table } from 'antd'


export default function Docters() {

    const {  Logout } = useAuth()
    const [error,setError] = useState("")
    const [data,setData] = useState()
    const navigate = useNavigate()

    async function handleLogout(){
        try{
            await Logout();
            navigate("/")
        }catch{
            setError("failed to Logout")
        }
    }


    const columns =[
        {
            key:'1',
            title:'Docter ID',
            dataIndex:'did',
            align:'center'
        },
        {
            key:'2',
            title:'Name',
            dataIndex:'name',
            align:'center'
        },
        {
            key:'3',
            title:'Qualification',
            dataIndex:'qualification',
            align:'center'
        },
        {
            key:'4',
            title:'Availability',
            align:'center',
            render : (text) => {
                if (text.availability) {
                   return <div className='fakebtngreen'>Yes</div>
                } else {
                   return <div className='fakebtnred'>No</div>
                }
            }
        }
    ]

    useEffect(() => {
        const getdata = async () =>{
            try {
            const res = await fetch("https://reva-health-bd.herokuapp.com/api/v1/doctor/all?uid=sdjkhb")
            const data = await res.json();
            // console.log(data);
            setData(data)
            
          }
             catch  {
          setError("Failed to load Data")
        }}

        getdata()
    },[])



  return (
    <>
        <Navbar bg="dark" expand="lg" variant="dark" >
            <Container fluid >
                <Navbar.Brand href="#">REVA Health APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                 <Link className='navLink' to="/test">Tests</Link>
                 <Link className='navLink' to="/appointments">Appointments</Link>
                 <Link className='navLink' to="/docters">Docters</Link>
                </Nav>
                <Form className="d-flex">
                    <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            {error && <Alert varient="danger">{error}</Alert>}
            <div className="d-flex justify-content-center m-4"><h2>Docters</h2></div>

    <Container>
        <Table columns={columns} dataSource={data}></Table>
    </Container>

    </>
  )
}
