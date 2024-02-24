import React from 'react'
import { deleteWishList, getWishList, useWishList, useWishListCrud } from '../../useWisList'
import Loading from '../../Loading'
import emptyimg from '../../assests/preview.png'
import { addToCart, useCartCrud } from '../../useCart'
import { Helmet } from 'react-helmet'

export default function WishList() {
  let { data, isLoading, isError, error } = useWishList('getWishList', getWishList)
  let {mutate} = useCartCrud(addToCart)
     let {mutate:deletedMutate,data:deleteddata} = useWishListCrud(deleteWishList)

    
     if(isLoading)
     return <Loading></Loading>
     if (!data?.data?.data || data?.data?.data?.length === 0) {
      return (
        <div className='text-center my-4'>
          <h4>WishList is empty</h4>
          <img src={emptyimg} height={400} alt='' />
        </div>
      );
    }


 

  return (<>
    <Helmet>
        <title>WishList component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
 

  <div className="container w-75">
  
  {data?.data?.data?.map((prod) => (
    <div className='row gy-2 justify-content-between align-items-center' key={prod._id}>
      <div className="col-md-8">
        <div className="row gy-3 align-items-center">
          <div className="col-md-4">
            <img src={prod.imageCover} className='w-100 my-3' alt="" />
          </div>
          <div className="col-md-8">
            <p className=' fw-semibold'>{prod.title}</p>
            <p className='text-main fw-semibold'>{prod.price} EGP</p>
            <p className='cursor-pointer' onClick={() => { deletedMutate(prod._id) }}><i className='fa-solid fa-trash text-main text-danger '></i><span className='text-danger'>Remove</span></p>
          </div>
        </div>
      </div>
      <div className="col-md-4 d-flex ">
      <button className='btn btn-success form-control my-4' onClick={()=>{mutate(prod._id)}}>Add to Cart</button> 
      </div>
    </div>
  ))}
</div></>
);
}
