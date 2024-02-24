import { createContext, useState } from "react";

export const userContext=createContext(null)
export function UserContextProvider({children}){
    let[User,setisUser]=useState(null)

    let[Login,setLogin]=useState(null) 
    let[isOpen,setOpen]=useState(false)

    return<userContext.Provider value={{User,setisUser,Login,setLogin,isOpen,setOpen}}>
        {children}
    </userContext.Provider>
}