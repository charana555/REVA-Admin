import React, { useState, useEffect } from "react";
import { AiFillCheckSquare, AiFillCloseSquare } from "react-icons/ai";

import Navbar from "./Navbar";

export default function Appointments() {
  const [data, setData] = useState();
  const [loading, setLoding] = useState(true);

  const refresh = () => {
    window.location.reload(true);
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await fetch(
          "https://reva-health-bd.herokuapp.com/api/v1/appointment/doctor?uid=sdjkhb"
        );
        const data = await res.json();
        setData(data);
        setLoding(false);
      } catch {
        window.alert("Failed to load Data");
      }
    };

    getdata();
  }, []);

  const accpetRecord = async (record) => {
    const url = `https://reva-health-bd.herokuapp.com/api/v1/appointment/${record.aid}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: "sdjkhb",
        astatus: "Accepted",
      }),
    });
    if (res.status === 200) {
      window.alert("Successfully updated");
      refresh();
    }
  };
  const declinRecord = async (record) => {
    const url = `https://reva-health-bd.herokuapp.com/api/v1/appointment/${record.aid}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: "sdjkhb",
        astatus: "Rejected",
      }),
    });
    if (res.status === 200) {
      window.alert("Successfully updated");
      refresh();
    }
  };

  return (
    <>
      <Navbar />
      <h1 className=" text-center text-4xl my-3 ">Appointments</h1>
      <div className="border border-b-2 w-[80vw] mx-auto overflow-auto rounded-lg shadow">
        <table className=" w-full">
          <thead className=" bg-gray-300">
            <tr>
              <th className=" p-3 font-semibold text-sm tracking-wide text-left">
                Request ID
              </th>
              <th className=" p-3 font-semibold text-sm tracking-wide text-left">
                Docter ID
              </th>
              <th className=" p-3 font-semibold text-sm tracking-wide text-left">
                Description
              </th>
              <th className=" p-3 font-semibold text-sm tracking-wide text-left">
                Date
              </th>
              <th className=" p-3 font-semibold text-sm tracking-wide text-left">
                Phone
              </th>
              <th className=" p-3 font-semibold text-sm tracking-wide text-left">
                Status
              </th>
              <th className=" p-3 font-semibold text-sm tracking-wide ">
                Accept
              </th>
              <th className=" p-3 font-semibold text-sm tracking-wide ">
                Reject
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className=" divide-y divide-gray-200 ">
              {data.map((item, i) => (
                <tr
                  key={item._id}
                  className={i % 2 === 0 ? `bg-white` : `bg-gray-100`}
                >
                  <td className=" whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 w-28">
                    {" "}
                    {item.aid}{" "}
                  </td>
                  <td className=" whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 w-32">
                    {item.did}
                  </td>
                  <td className=" whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 ">
                    {item.description}
                  </td>
                  <td className=" whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 w-32">
                    {" "}
                    {item.date.slice(0, 10)}{" "}
                  </td>
                  <td className=" whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 w-24">
                    {" "}
                    {item.phNo}{" "}
                  </td>
                  {item.astatus === "Accepted" ? (
                    <td className=" font-semibold whitespace-nowrap px-3 py-1.5 text-sm text-green-800 w-24">
                      {" "}
                      {item.astatus}{" "}
                    </td>
                  ) : (
                    <td className=" font-semibold whitespace-nowrap px-3 py-1.5 text-sm text-red-800 w-24 ">
                      {" "}
                      {item.astatus}{" "}
                    </td>
                  )}
                  <td className=" whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 w-24 text-center ">
                    <button
                      onClick={() => accpetRecord(item)}
                      className=" text-4xl text-green-700 hover:text-green-600 "
                    >
                      <AiFillCheckSquare />
                    </button>
                  </td>
                  <td className=" whitespace-nowrap px-3 py-1.5 text-sm text-gray-800 w-24 text-center ">
                    <button
                      onClick={() => declinRecord(item)}
                      className=" text-4xl text-red-700 hover:text-red-600 "
                    >
                      <AiFillCloseSquare />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}
