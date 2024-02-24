import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";


let baseURRL = 'https://ecommerce.routemisr.com/api/v1'
let token = localStorage.getItem('userToken')
//add to cart
export function addToCart(productId) {
    return axios.post(`${baseURRL}/cart`, { productId }, {
        headers: {
            token
        }
    })
}
//gat cart
export function getCart() {
    return axios.get(`${baseURRL}/cart`, {
        headers: {
            token
        }
    })
}


//delet cart


export function deleteCart(id) {
    return axios.delete(`${baseURRL}/cart/${id}`, {
        headers: {
            token
        }
    })
}

//update

export function updateCart({id, count}) {
    return axios.put(`${baseURRL}/cart/${id}`,{ count}, {
        headers: {
            "Content-Type":'application/json',
            token
        }
    })
}


export function useCartCrud(fn) {
    const queryClient = useQueryClient()
    return useMutation(fn, {
        onSuccess: async(data) => {
            toast.success(data?.data?.message);
            queryClient.invalidateQueries('getCart')
        },
        onError: (data) => {
            toast.error(data?.message)
        }
    })
}
export function checkout({id,shippingAddress}) {
    return axios.post(`${baseURRL}/orders/checkout-session/${id}?url=http://localhost:3000`,{shippingAddress}, {
        headers: {
            token
        }
    })
}

export function useCart(key, fn) {
    return useQuery(key, fn)
}