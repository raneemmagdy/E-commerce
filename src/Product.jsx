import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addToCart, useCartCrud } from './useCart'
import { addToWishList, useWishListCrud } from './useWisList'


export default function Product({ prod }) {


  let {mutate} = useCartCrud(addToCart)
  let [heart, setHeart] = useState(false)
  let {mutate:mutateWishList}=useWishListCrud(addToWishList)

  return <div className='col-md-3 my-2'>
    <div className="product  p-2 cursor-pointer">
      <Link to={`/productDetails/${prod._id}`} className='custom-link'>
        <img src={prod.imageCover} className='w-100' alt={prod.title} />
        <h2 className='h5 text-main'>{prod.category.name}</h2>
        <p>{prod.title}</p>
        <div className="box d-flex justify-content-between">
          <span>{prod.price} EGP</span>
          <span>{prod.ratingsAverage} <i className='fa-solid fa-star rating-color'></i> </span>
        </div>
      </Link>
    <div className="content d-flex justify-content-between">
    <button className='btn btn-brdr my-2' onClick={()=>{mutate(prod._id)}}>Add to Cart</button>
    <i className='fa-solid fa-heart fa-2x m-3 cursor-pointer' style={heart ? { color: 'red' } : { color: 'unset' }} onClick={()=>{mutateWishList(prod._id);setHeart(!heart)}}></i>
    </div>

    </div>
  </div>
}