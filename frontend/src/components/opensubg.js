import React from "react";
export default function OpenSubg(){

    var info=JSON.parse(localStorage.getItem("curr_subg"));
    localStorage.setItem("inOpenSubg","1");
    return (
        <div style={{marginTop:"15%"}}>
            <h1 style={{color:"white"}}><u><i>Hi! This is {info.name}</i></u></h1>
        </div>
    )
}