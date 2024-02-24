import React, { useContext } from 'react'
import logo from'../../assests/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../UserContext'
import { getCart, useCart } from '../../useCart'

export default function Navbar() {
  let { data } = useCart('getCart', getCart)
  let {User,setisUser,setOpen,Login}=useContext(userContext)
  let navigate = useNavigate()
  function LogOut() {
    setisUser(null)
      localStorage.removeItem('userToken')
      navigate('/')
  }
  return (<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to='home'>
        <img src={logo} alt="Cart Logo" className='w-100' />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {User?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
       <li className="nav-item">
         <Link className="nav-link" to='home'>Home</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to='products'>Products</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to='Category'>Categories</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to='brands'>Brands</Link>
       </li>

       <li className="nav-item">
         <Link className="nav-link" to='wishList'>WishList</Link>
       </li>
     
     </ul>:''}
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

{/*   
        <li className="nav-item">
          <Link className="nav-link" to='/'> <i className="fa-brands fa-facebook"></i></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/'>  <i className="fa-brands fa-twitter"></i></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/'>    <i className="fa-brands fa-instagram"></i></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/'>  <i className="fa-brands fa-youtube"></i></Link>
        </li> */}
                            <li className="nav-item">
                                <a className="nav-link" href="http://www.twitter.com"
                                >
                                    <i className='fa-brands fa-twitter'></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://www.youtube.com"
                                >
                                    <i className='fa-brands fa-youtube'></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://www.linkedin.com"
                                >
                                    <i className='fa-brands fa-linkedin'></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://www.facebook.com"
                                >
                                    <i className='fa-brands fa-facebook'></i>
                                </a>
                            </li>

      {!User?<>
        <li className="nav-item">
          <Link className="nav-link" to='register'>Register</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to='/'>Login</Link>
        </li></>:  <li className="nav-item">
                 <span className='nav-link cursor-pointer' onClick={LogOut}>Logout</span>
                     </li>}
                     <li className="nav-item position-relative" data-bs-toggle={!User ? 'modal' : ''} data-bs-target="#exampleModal" onClick={() => { setOpen(true) }}>
                                <Link className="nav-link" to="cart"
                                >
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </Link>
                                <span className='d-inline-block cart d-flex justify-content-center align-items-center position-absolute  rounded-circle '>{data?.data?.numOfCartItems}</span>
                            </li>
                            {User ? <li className="nav-item profile">
                                <span className='nav-link ms-5 d-flex' >
                                    <span className='fw-bolder '>Hi<br /></span><span className='mx-1'>{Login}</span>
                                </span>
                            </li> : ''}
       
      </ul>
     


      
    </div>
  </div>
</nav>
<div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-body">
                            <p>Please login first ...</p>
                        </div>

                    </div>
                </div>
            </div></>
  )
}
