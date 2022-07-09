import "antd/dist/antd.css"
import React,{ useState , useEffect}from 'react'
import { Table } from "antd"
import { Button ,Container , Nav , Navbar , Form ,Alert } from "react-bootstrap"
import {  useNavigate , Link} from "react-router-dom"
import {DeleteFilled ,CheckSquareFilled } from "@ant-design/icons"
import { useAuth } from '../Context/AuthContext'
import logo from '../assets/logo192.png'


export default function Appointments() {
    const [data,setData] = useState()
    const [error,setError] = useState("")

    const navigate = useNavigate()
    const {  Logout } = useAuth()

    const refresh = () =>{
        window.location.reload(true)
    }

    async function handleLogout(){
        try{
            await Logout();
            navigate("/")
        }catch{
            setError("failed to Logout")
        }
    }
    

    useEffect(() => {
        const getdata = async () =>{
            try {
            const res = await fetch("https://reva-health-bd.herokuapp.com/api/v1/appointment/doctor?uid=sdjkhb")
            const data = await res.json();
            // console.log(data);
            setData(data)
            
          }
             catch  {
          setError("Failed to load Data")
        }}

        getdata()
    },[])

  

    const columns = [
        {
            key:'1',
            title:'Request ID',
            dataIndex:'aid',
            align:'center'
        },
        {
            key:'2',
            title:'User ID',
            dataIndex:'uid',
            align:'center'
        },
        {
            key:'3',
            title:'Doctor ID',
            dataIndex:'did',
            align:'center'
        },
        {
            key:'4',
            title:'Description',
            dataIndex:'description',
            align:'center'
        },
        {
            key:'5',
            title:'Date',
            dataIndex:'date',
            align:'center'
        },
        {
            key:'6',
            title:'Status',
            dataIndex:'astatus',
            align:'center'
        },
        {
            key:'7',
            title:'Accept',
            align:'center',
            render: (record) =>{
                return <>
                    <CheckSquareFilled onClick={() =>{
                        accpetRecord(record)
                    }} style={{color : 'green' , marginRight : 20 , fontSize: '35px'}} />
                </>
            }
        },
        {
            key:'8',
            title:'Reject',
            align:'center',
            render: (record) =>{
                return <>
                    <DeleteFilled  onClick = {() =>{
                        declinRecord(record)
                    }} style={{color : 'red' , marginLeft : 20 , fontSize: '35px'}}/>
                </>
            }
        }
    ]

    const accpetRecord = async (record) =>{
        const url = `https://reva-health-bd.herokuapp.com/api/v1/appointment/${record.aid}`;
        console.log(url);
        const res = await fetch(url , {
            method : "PUT" ,
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid : "sdjkhb",
                astatus:"Accepted"
            })
        });
       if(res.status === 200){
            window.alert("Successfully updated")
            refresh()
       }
    }
    const declinRecord = async (record) =>{
        const url = `https://reva-health-bd.herokuapp.com/api/v1/appointment/${record.aid}`;
        console.log(url);
        const res = await fetch(url , {
            method : "PUT" ,
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid : "sdjkhb",
                astatus:"Rejected"
            })
        });
        if(res.status === 200){
            window.alert("Successfully updated")
            refresh()
       }
    }

  return (
    <>
    <header>
      <Navbar bg="dark" expand="lg" variant="dark" >
            <Container fluid >
                <Navbar.Brand href="#"><img
                        alt=""
                        src= {logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top mr-3"
                 />REVA Health APP</Navbar.Brand>
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
            <div className="d-flex justify-content-center m-4"><h2>Appointments</h2></div>
        
    <Container>
        <Table columns={columns} dataSource={data}></Table>
    </Container>
    </header>
    </>
  )
}
