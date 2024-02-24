import React, { Suspense, useContext, useEffect } from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from './Component/Home/Home'
import Category from './Component/Category/Category'

import Register from './Component/Register/Register'
import Login from './Component/Login/Login'
import Notfound from './Component/Notfound/Notfound'
import Brands from './Component/Brands/Brands'
import Cart from './Component/Cart/Cart'
import { userContext } from './UserContext'
import { ProtectedRoute } from './ProtectedRoute'
import ProductDetails from './ProductDetails'
//import Orders from './Orders'
import Loading from './Loading'

import { lazy } from 'react';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword.jsx'
import WishList from './Component/WishList/WishList.jsx'


// import VerifyResetCode from './Component/VerifyResetCode/VerifyResetCode.jsx'
// import UpdatePassword from './Component/UpdatePassword/UpdatePassword.jsx'



const Products = lazy(() => import('./Component/Products/Products.jsx'));
const Orders = lazy(() => import('./Orders'));




export default function App() {

  let {setisUser,setLogin}=useContext(userContext)
  useEffect(()=>{
    if(localStorage.getItem('userToken'))
    setisUser(localStorage.getItem('userToken'))
    setLogin(localStorage.getItem('userName'))

  },[])


  const routes=createBrowserRouter([
    {path:'',element:<Layout></Layout>,children:[
      {path:'home',element:<ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:'register',element:<Register></Register>},
      {index:true,element:<Login></Login>},
      { path: 'allorders', element: <Suspense><Orders fallback={<Loading></Loading>}></Orders></Suspense> },
      
      {path:'category',element:<ProtectedRoute><Category></Category></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands></Brands></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'productDetails/:id',element:<ProductDetails></ProductDetails>},
      {path:'wishList',element:<WishList></WishList>},

      


      // {path:'/verify-reset-code',element:<VerifyResetCode></VerifyResetCode>},
       {path:'/forgot-password',element:<ForgetPassword></ForgetPassword>},
      
      
      { path: 'products', element: <ProtectedRoute><Suspense fallback={<Loading></Loading>}><Products></Products> </Suspense></ProtectedRoute> },

      {path:'*',element:<Notfound></Notfound>}

    ]}
  ])
  return (
   <RouterProvider router={routes}></RouterProvider>
  )
}
