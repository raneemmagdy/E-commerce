import React, { useContext, useState } from 'react'
import { userContext } from '../../UserContext'
import { checkout, deleteCart, getCart, updateCart, useCart, useCartCrud } from '../../useCart'
import Loading from '../../Loading'
import emptyimg from '../../assests/preview.png'
import { Helmet } from 'react-helmet'

export default function Cart() {
  let { isOpen, setOpen } = useContext(userContext)
    let { data, isLoading, isError, error } = useCart('getCart', getCart)
     
     let {mutate:deletedMutate,data:deleteddata} = useCartCrud(deleteCart)
     let {mutate,data:updateddata} = useCartCrud(updateCart)
     let { mutate: mutatecheckout, data: checkoutdata } = useCartCrud(checkout)

     let [details, setDetails] = useState('');
     let [phone, setphone] = useState('');
     let [city, setcity] = useState('');
     function getAddress(e) {
   
       e.preventDefault()
       let id = data?.data?.data?._id;
       let shippingAddress = {
         details,
         phone,
         city
       }
   
       mutatecheckout({ id, shippingAddress })
       if (checkoutdata?.data?.status === 'success')
         window.location.href = checkoutdata?.data?.session?.url
     }
    
    if(isLoading)
    return <Loading></Loading>
    console.log(data.data.data)
    
    if(isError)
    return <div className='text-center my-4'>
    <h4>Cart is empty</h4>
    <img src={emptyimg} height={400} alt="" />
  </div>

    return (<>
      <Helmet>
        <title>Cart component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
        <aside className={data?.data?.numOfCartItems ? 'main-color' : '#fff'} style={isOpen ? { right: 0, transition: 'right 1s' } : { right: '-100%', transition: 'right 1s' }}>
            <i className='fa-solid fa-close p-3 fa-2x cursor-pointer' onClick={() => { setOpen(false) }}></i>

           <div className="container">
             { data?.data.numOfCartItems ?<>
                <h3 className='text-main'>Number of Cart items{data?.data.numOfCartItems}</h3>
            <p>total cart price <span className='fw-bolder mx-3'>{data?.data?.data?.totalCartPrice}</span> </p>
            {data?.data?.data?.products.map((prod) => <div  className='row gy-2 justify-content-between align-items-center' key={prod.product._id}>
                <div className="col-md-8">

                    <div className="row gy-3 align-items-center">
                        <div className="col-md-2">
                            <img src={prod.product.imageCover} className='w-100 my-3' alt="" />
                        </div>
                        <div className="col-md-10">
                           <p>{prod.product.title}</p>
                           <p className='text-main'>{prod.price} EGP</p>
                           <p className='cursor-pointer' onClick={()=>{deletedMutate(prod.product._id)}}><i className='fa-solid fa-trash text-main '></i>Remove</p>
                        </div>
                    </div>

                </div>
                <div className="col-md-4 d-flex justify-content-end">
                    <div>
                    <button className='btn btn-brdr p-1' onClick={()=>{mutate({id:prod.product._id,count:prod.count+1})}}>+</button>
                    <span className='mx-2'>{prod.count}</span>
                    <button className='btn btn-brdr p-1'  onClick={()=>{mutate(prod.product._id,prod.count-1)}}>-</button>
                    </div>
                </div>
            </div>)
            
            }
            
          <button
            type="button"
            className="btn brd-btn btn-lg my-5"
            data-bs-toggle="modal"
            data-bs-target="#modalId">
            checkout
          </button>

          <div
            className="modal fade"
            id="modalId"

            data-bs-backdrop="static"
            data-bs-keyboard="false"

            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">

                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form action="" onSubmit={getAddress}>
                    <input type="text" placeholder='details' onChange={(e) => setDetails(e.target.value)} className='form-control my-2' />
                    <input type="text" placeholder='phone' onChange={(e) => setphone(e.target.value)} className='form-control my-2' />
                    <input type="text" placeholder='city' className='form-control my-2' onChange={(e) => setcity(e.target.value)} />
                    <button className='btn brd-btn' type='submit'>send</button>
                  </form>
                </div>

              </div>
            </div>
          </div>




             </>: <div className='text-center my-4'>
            <h4>Cart is empty</h4>
            <img src={emptyimg} height={400} alt="" />
          </div>}
              
           </div>
        </aside>
        </>
    )
}
