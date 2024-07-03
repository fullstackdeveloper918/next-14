"use client"
import React, { useEffect, useState } from 'react'
import data from "../../data.json"
import { useRouter } from 'next/navigation';

export default function page() {
const router=useRouter()
  console.log(data, "data");
  const storedUsers = localStorage.getItem('user1');
  const userData = JSON.parse(storedUsers as any);
    console.log(userData.email,"123");

    const handlePush=()=>{
      router.push('/formdata')
    }
    const handlePush1=()=>{
      router.push('/imagereduce')
    }
    const handlePush2=()=>{
      router.push('/videoreduce')
    }
  return (
    <div className='container'>
      <div className="row gap-2">
        <div className="text-center mt-4 mb-4 ">
          <h1 className="">Dashboard</h1>
        </div>
        <div className="d-flex mb-3 gap-3 justify-content-between">

        <div className="text-center">
          <button className="" onClick={handlePush}> Go to form</button>
        </div>
        <div className="d-flex gap-3">

        <div className="text-center">
          <button className="" onClick={handlePush1}>Image Reducer</button>
        </div>
        <div className="text-center">
          <button className="" onClick={handlePush2}>Video Reducer</button>
        </div>
        </div>
        </div>
        {/* {userInfo?.roles?.includes() || userInfo?.super_admin ?:""} */}
        {/* {userData.email==="abhay@gmail.com"? */}

        {userData.email==="admin@gmail.com"?
        <>
        <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">User's</h5>
          {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

        </div>
      </div>
      <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
          <h5 className="card-title">Faq's Page</h5>
            {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Term's</h5>
            {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Contact Us</h5>
            {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

          </div>
        </div>
        </>
      
        :
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">User's</h5>
            {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

          </div>
        </div>}
        {userData.email==="abhay@gmail.com"?
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Faq's Page</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

          </div>
        </div>:""}
        {userData.email==="abhay1@gmail.com"?
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Term's Page</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

          </div>
        </div>:""}
        {userData.email==="abhay2@gmail.com"?
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Contact Us</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>:""}
      </div>

    </div>
  )
}
