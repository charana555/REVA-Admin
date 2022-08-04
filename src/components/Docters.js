import React ,{ useState ,useEffect} from 'react'

import Navbar from './Navbar'


export default function Docters() {

  
    const [data,setData] = useState()
    const [loading,setLoding] = useState(true);
   

    useEffect(() => {
        const getdata = async () =>{
            try {
            const res = await fetch("https://reva-health-bd.herokuapp.com/api/v1/doctor/all?uid=sdjkhb")
            const data = await res.json();
            // console.log(data);
            setData(data)
            setLoding(false)
          }
             catch  {
          window.alert("Failed to load Data")
        }}

        getdata()
    },[])



  return (
    <>
      <Navbar/> 
      <h1 className=' text-center text-4xl my-3 ' >Docters</h1>
      <div className='border border-b-2 w-[80vw] mx-auto overflow-auto rounded-lg shadow' >
        <table className=' w-full' >
          <thead className=' bg-gray-300' >
            <tr>
              <th className=' p-3 font-semibold text-sm tracking-wide text-left' >Docter ID</th>
              <th className=' p-3 font-semibold text-sm tracking-wide text-left' >Name</th>
              <th className=' p-3 font-semibold text-sm tracking-wide text-left' >Qualification</th>
              <th className=' p-3 font-semibold text-sm tracking-wide text-left' >Phone</th>
              <th className=' p-3 font-semibold text-sm tracking-wide text-left' >Availability</th>
            </tr>
          </thead>
          {!loading && <tbody className=' divide-y divide-gray-200 '>
          {
            data.map((item ,i) => (
              <tr key={item._id} className = {i%2===0 ? `bg-white`:`bg-gray-100`} >
                <td className='whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 '> {item.did} </td>
                <td className='whitespace-nowrap px-3 py-1.5 text-sm text-gray-800  ' > { item.name } </td>
                <td className='whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 ' >{ item.qualification }</td>
                <td className='whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 ' >{ item.phNo }</td>
                <td className='whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 ' >{item.availability ? <button className=' bg-red-700 text-white py-2 px-5 rounded-md' >No&nbsp;</button> : <button className=' bg-green-700 text-white font  py-2 px-5 rounded-md' >Yes</button> }</td>      
              </tr>
            ))
          }
          </tbody> }
        </table>
      </div>
    </>
  )
}
