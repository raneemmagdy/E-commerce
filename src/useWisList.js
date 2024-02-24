import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";


let baseURRL = 'https://ecommerce.routemisr.com/api/v1'
let token = localStorage.getItem('userToken')
//add to WishList
export function addToWishList(productId) {
    return axios.post(`${baseURRL}/wishlist`, { productId }, {
        headers: {
            token
        }
    })
}
//gat WishList
export function getWishList() {
    return axios.get(`${baseURRL}/wishlist`, {
        headers: {
            token
        }
    })
}


//delet WishList


export function deleteWishList(id) {
    return axios.delete(`${baseURRL}/wishlist/${id}`, {
        headers: {
            token
        }
    })
}

//update WishList




export function useWishListCrud(fn) {
    const queryClient = useQueryClient()
    return useMutation(fn, {
        onSuccess: async(data) => {
            toast.success(data?.data?.message);
            queryClient.invalidateQueries('getWishList')
        },
        onError: (data) => {
            toast.error(data?.message)
        }
    })
}


export function useWishList(key, fn) {
    return useQuery(key, fn)
}