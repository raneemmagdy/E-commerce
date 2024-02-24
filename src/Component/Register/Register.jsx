import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Bars, InfinitySpin } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import *  as Yup from 'yup'
export default function Register() {
const navigate=useNavigate()
let [Loading,setLoading]=useState(false)
let[msg,setmsg]=useState('')


  async function getRegister(values){
  try {
    setLoading(true)
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    
    if(data.message=== 'success'){
     
      navigate('/')
      setmsg('')
      setLoading(false)}
  } catch (error) {
    setmsg(error.response.data.message)
    setLoading(false)
  }
  }


  const validationSchema=Yup.object({
    name:Yup.string().required('name is required').min(2,'to short min is 2').max(10,'too long max is 6'),
    email:Yup.string().required('email is required').email('email is not valid'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z 0-9]{5,10}$/, 'Password not valid'),
    rePassword:Yup.string('repassword is required').oneOf([Yup.ref('password')],'Must be like password'),
    phone:Yup.string().required('phone is required').matches(/^(002)?(01)[0-25][0-9]{8}/,'phone not valid')
  })
  let formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },validationSchema
    , onSubmit:getRegister
  })
  return (<>
    <h4>Register Now:</h4>
   
    <form  className='w-75 m-auto my-4' onSubmit={formik.handleSubmit}>
    {msg?<p className='alert alert-danger'>{msg}</p>:' '}
      <label htmlFor="name" >name</label>
      <input type="text" className='form-control mb-2' value={formik.values.name} name="" id="name"  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.name&&formik.touched.name?<p className='alert alert-danger'>{formik.errors.name}</p>:''}
      <label htmlFor="email">email</label>
      <input type="email" className='form-control mb-2' value={formik.values.email} name="" id="email" onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
      {formik.errors.email&&formik.touched.email?<p className='alert alert-danger'>{formik.errors.email}</p>:''}
      <label htmlFor="password">password</label>
      <input type="password" className='form-control mb-2' value={formik.values.password} name="" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password&&formik.touched.password?<p className='alert alert-danger'>{formik.errors.password}</p>:''}

      <label htmlFor="rePassword">rePassword</label>
      <input type="password" className='form-control mb-2' value={formik.values.rePassword} name="" id="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.rePassword&&formik.touched.rePassword?<p className='alert alert-danger'>{formik.errors.rePassword}</p>:''}

      <label htmlFor="phone">phone</label>
      <input type="tel" className='form-control mb-2'  value={formik.values.phone}name="" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.phone&&formik.touched.phone?<p className='alert alert-danger'>{formik.errors.phone}</p>:''}

      <button disabled={!(formik.isValid&& formik.dirty)} type='submit'className='btn green-color text-white d-block ms-auto' >{Loading?<Bars
  height="30"
  width="50"
  color="#fff"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />:'Register'}</button>
    </form>
    </>
  )
}
