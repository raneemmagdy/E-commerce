import React from 'react'
import img from '../../assests/error.svg'
import { Helmet } from 'react-helmet'
export default function Notfound() {
  return (

    <>
    <Helmet>
        <title>NotFound component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
    <div className="py-4 text-center">
    <img src={img} alt='error' />
            
    </div></>
  )
}
