import axios from "axios";
import React, { useEffect, useState } from "react";

const FollowRequestContainer = () => {

    const [allreq, SetAllreq] = useState([]);
    var info = JSON.parse(localStorage.getItem("curr_subg"));
    useEffect(() => {
        var tosend = {
            id: info._id
        }
        axios.post("http://localhost:7000/getjoinreqests", tosend)
            .then((res) => {
                SetAllreq(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const onAccept = (e,req) => {
        e.preventDefault();
        console.log(req);
        axios.post("http://localhost:7000/acc_req",req)
        .then((res)=>{
            console.log(res);
            
            axios.post("http://localhost:7000/get_no_users",{subgid:info._id})
            .then(res2=>{
                var d = new Date();
                var date = String(d.getDate());
                var year = String(d.getFullYear());
                var month = String(d.getMonth()+1);
                var total = date+"-"+month+"-"+year;

                var tosend = {
                    date : total,
                    subgid : info._id,
                    users : res2.data.people.length
                }
                axios.post("http://localhost:7000/inc_gro_subg",tosend)
                .then(res3=>{
                    console.log(res3);
                })
                .catch(err3=>{
                    console.log(err3);
                })
            })
            .catch(err2=>{
                console.log(err2);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
        SetAllreq(allreq.filter((request)=>{
            return request!=req;
        }))
    }

    const onReject = (e,req) => {
        e.preventDefault();
        axios.post("http://localhost:7000/rej_req",req)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        SetAllreq(allreq.filter((request)=>{
            return request!=req;
        }))
    }

    return (
        <>
            {allreq.map((req) => {
                return (
                    <div className="container p-2 my-3 bg-light" style={styles.box}>
                        <ul className="list-group">
                            <li className="list-group-item" style={{ fontWeight: 'bold' }}>
                                <span className="font-weight-bold">Name: </span>{req.name}
                            </li>
                            <li className="list-group-item" style={{ fontWeight: 'bold' }}>
                                <span className="font-weight-bold">Email: </span>{req.email}
                            </li>
                        </ul>
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-danger"
                                style={{ marginTop: 10, marginLeft: 50 }}
                                onClick={(e)=>{onAccept(e,req)}}
                            >
                                Accept
                            </button>
                            <button type="button"
                                className="btn btn-primary"
                                style={{ marginTop: 10, marginRight: 50 }}
                                onClick={(e)=>{onReject(e,req)}}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

const styles = {
    box: {
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
        width: '40%'
    }
};

export default FollowRequestContainer;
