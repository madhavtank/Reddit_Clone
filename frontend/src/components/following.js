import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Following() {

    var info = JSON.parse(localStorage.getItem("info"));

    const [all, Setall] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:7000/get_following", { email: info.email })
            .then(res => {
                console.log(res.data);
                Setall(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const Remove_following = (e, user) => {
        e.preventDefault();
        var tosend = {
            toremove: user,
            from: info.email
        }
        axios.post("http://localhost:7000/remove_following", tosend)
            .then(res => {
                alert(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        Setall(all.filter(ele => {
            return ele !== user;
        }))
    }

    return (
        <center>
            <div style={{ color: 'white' }}><h2><u><i>Following</i></u></h2></div>
            <div style={{ backgroundColor: 'white', borderRadius: '10px', width: '40%', padding: '5px', marginTop: '2%' }}>
                {all.map(user => {
                    return (
                        <div className="container p-2 my-3 bg-dark" style={{ width: '100%', borderRadius: '10px' }}>
                            <ul className="list-group">
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold" style={{ color: 'white', fontSize: '23px' }}>Email : {user} </span>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={(e) => Remove_following(e,user)}
                                    >
                                        Unfollow
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </center>
    )
}