import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import Slider from 'react-slick';
import { featuredSingleProduct, useProducts } from './useProduct'
import { addToCart, useCartCrud } from './useCart'
import { addToWishList, useWishListCrud } from './useWisList';

export default function ProductDetails() {
    
  let {mutate} = useCartCrud(addToCart)
  
  let { id } = useParams()
  let{mutate:mutateWishList,data:dataWishList}=useWishListCrud(addToWishList)

    let { isLoading, isError, error, data } = useProducts('productdetails', () => featuredSingleProduct(id))
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    if (isLoading)
        return <Loading></Loading>

    if (isError)
        return <h2>{error.message}</h2>


       

    return (
        <div className='row align-items-center'>
            <div className="col-md-4">
                {/* <img src={data?.imageCover} className='w-100' alt="" /> */}
                <Slider {...settings}>
                        {data?.images?.map((img) => <img key={img} src={img} alt=''></img>)}
                </Slider>
            </div>
            <div className="col-md-8">
                <h3>{data?.title}</h3>
                <p>{data?.description}</p>
                
                    <span className='text-main'>{data?.category?.name}</span>
               
                <div className="box d-flex justify-content-between">
                    <span>{data?.price} EGP</span>
                    <span>{data?.ratingsAverage} <i className='fa-solid fa-star rating-color'></i> </span>
                </div>
                    <button className='btn btn-success form-control my-4' onClick={()=>{mutate(data?._id)}}>Add to Cart</button> 
            </div>
        </div>
    )
}
