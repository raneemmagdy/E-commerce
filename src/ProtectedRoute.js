import { Navigate } from "react-router-dom";

export function ProtectedRoute({children}){
if(!localStorage.getItem('userToken')){
return<Navigate to='/'></Navigate>

}else {
    return children
}
}