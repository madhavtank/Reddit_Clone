import { Navigate } from "react-router-dom";
import React from "react";
const Protect = ({ children }) => {
    var temp = localStorage.getItem('ok');
    console.log(temp) 
    if (temp === '1') {
        console.log(children)
        return children;
    }
    else {
        return (
                <Navigate to="/"></Navigate>);
    }
}
export default Protect;