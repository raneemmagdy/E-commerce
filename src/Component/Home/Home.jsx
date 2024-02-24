import React from 'react'
import { featuredProduct, useProducts } from '../../useProduct'
import Loading from '../../Loading'
import Product from '../../Product'
import MainSlider from '../../MainSlider'
import CategorySlider from '../../CategorySlider'
import { Helmet } from 'react-helmet'



export default function Home() {


  let { data, isLoading, error, isError } = useProducts('product', featuredProduct)
  if (isLoading)
    return <Loading></Loading>
  if (isError)
    return <h2>{error.message}</h2>


  return (
   <>
     <Helmet>
        <title>Home component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
    <MainSlider/>
    <CategorySlider/>
    <div className='row gy-4'>
      {data?.map((prod) => <Product key={prod._id} prod={prod}></Product>)}
    </div>

   </>
  )
}