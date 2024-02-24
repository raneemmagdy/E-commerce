import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (<>
  <div className="parent">
  <Navbar/>
   <div className="container ">
   <Outlet/>

   </div>
   <Footer/>
  </div>
    </>
  )
}
