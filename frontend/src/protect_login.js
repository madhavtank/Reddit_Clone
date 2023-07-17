import React from "react";
import { Navigate } from "react-router-dom";

const Protect_login = ({children}) => {
        var temp = localStorage.getItem('ok');
        if(temp==='1')
        {
            return(
                <Navigate to='/'></Navigate>
            )
        }
        else
        {
            return children
        }
}

export default Protect_login;