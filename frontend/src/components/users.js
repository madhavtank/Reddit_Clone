import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Showusers(props) {
    var info = JSON.parse(localStorage.getItem("curr_subg"));

    const [data,SetData]=useState([]);
    const [data2,SetData2]=useState([]);

    useEffect(()=>{
        var tosend={
            subgid:info._id
        }
        axios.post("http://localhost:7000/get_users",tosend)
        .then((res)=>{
            console.log(res.data);
            SetData(res.data.people);
            SetData2(res.data.blocked_ppl);
        })
        .catch((err)=>{
            console.log("err");
            console.log(err);
        })
    },[])

    return (
        <>
            <div className="container p-4 my-5 bg-light" style={styles.box}>
                <h2 className="text-center">Users</h2>
                <ul className="list-group">
                    {data.map(item => (
                        <li className="list-group-item">
                            <span className="font-weight-bold" style={{fontSize:'20px'}}>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container p-4 my-5 bg-light" style={styles.box}>
                <h2 className="text-center">Blocked Users</h2>
                <ul className="list-group">
                    {data2.map(item => (
                        <li className="list-group-item">
                            <span className="font-weight-bold" style={{fontSize:'20px'}}>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

const styles = {
    box: {
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
        width: '40%'
    }
};