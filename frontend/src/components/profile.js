import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import './Home.css'
import './profile.css'


export default function Profile() {

    var obj = window.localStorage.getItem("info");
    var info = JSON.parse(obj);
    const nvgt = useNavigate();

    const [all, Setall] = useState([]);
    const [allfw, Setallfw] = useState([]);

    const [inp_name,Setname] = useState(info.fname);
    const [inp_uname,Setuname] = useState(info.uname);
    const [inp_con,Setcon] = useState(info.contact);

    useEffect(() => {
        axios.post("http://localhost:7000/get_followers", { email: info.email })
            .then(res => {
                console.log(res.data);
                Setall(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    useEffect(() => {
        axios.post("http://localhost:7000/get_following", { email: info.email })
            .then(res => {
                console.log(res.data);
                Setallfw(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

     const handleupdate = (e) => {
        e.preventDefault();
        console.log("hi")
        const data = new FormData(e.currentTarget);
        var fname = data.get('fname');
        var uname = data.get('uname');
        var contact = data.get('contact');
        console.log(fname);
        console.log(uname);
        console.log(contact);

        var tosend = {
            email: info.email,
            fname: fname,
            uname: uname,
            contact: parseInt(contact)
        }
        axios.post("http://localhost:7000/update", tosend)
            .then((response) => {
                alert("Updated Successfully!")
                var newinfo = {
                    email: info.email,
                    password: info.password,
                    age: info.age,
                    fname: fname,
                    lname: info.lname,
                    uname: uname,
                    contact: contact
                }
                window.localStorage.setItem("info", JSON.stringify(newinfo));
                info = newinfo;
            })
            .catch(err=>{
                console.log(err);
            })
    }


    const openFollowers = (e) => {
        e.preventDefault();
        const nav = () => nvgt("/followers");
        nav();
    }

    const openFollowing = (e) => {
        e.preventDefault();
        const nav = () => nvgt("/following");
        nav();
    }

    const Valiadtecon = () => {
        return String(inp_con).match(/^\d{10}$/);
    }

    const Validate = () => {
        if(inp_name==='' || inp_uname==='') return 1;
        if(!Valiadtecon()) return 1;
        return 0;
    }

    return (
        <div>
            <center>
                <Box component='form' onSubmit={handleupdate}>
                    <div className="page-content page-container" id="page-content">
                        <div className="padding">
                            <div className="row container d-flex justify-content-center">
                                <div className="col-xl-6 col-md-12">
                                    <div className="card user-card-full">
                                        <div className="row m-l-0 m-r-0">
                                            <div className="col-sm-4 bg-c-lite-green user-profile">
                                                <div className="card-block text-center text-white">
                                                    <div className="m-b-25">
                                                        <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" />
                                                    </div>
                                                    {/* <h6 className="f-w-600">Admin</h6> */}
                                                    <TextField
                                                        // ref={"faname"}
                                                        id="fname"
                                                        name="fname"
                                                        required
                                                        value={inp_name}
                                                        onChange={(e)=>Setname(e.target.value)}
                                                        variant="standard"
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        style={{ marginTop: '25%' }}
                                                        type='submit'
                                                        disabled={Validate()}
                                                    >
                                                        Update
                                                    </Button>
                                                    {/* <p>Web Designer</p> */}
                                                    <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                </div>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="card-block">
                                                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Followers</p>
                                                            <h6 className="text-muted f-w-400" onClick={openFollowers} style={{cursor:'pointer'}} >{all.length}</h6>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Following</p>
                                                            <h6 className="text-muted f-w-400" onClick={openFollowing} style={{cursor:'pointer'}}>{allfw.length}</h6>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Email</p>
                                                            <h6 className="text-muted f-w-400">{info.email}</h6>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">User Name</p>
                                                            {/* <h6 className="text-muted f-w-400">admin</h6> */}
                                                            <TextField
                                                                id="uname"
                                                                name="uname"
                                                                required
                                                                value={inp_uname}
                                                                onChange={(e)=>Setuname(e.target.value)}
                                                                variant="standard"
                                                            />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Age</p>
                                                            <h6 className="text-muted f-w-400">{info.age}</h6>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Contact Number</p>
                                                            {/* <h6 className="text-muted f-w-400">1234567890</h6> */}
                                                            <TextField
                                                                id="contact"
                                                                name="contact"
                                                                required
                                                                value={inp_con}
                                                                onChange={e=>Setcon(e.target.value)}
                                                                variant="standard"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </center>
        </div>
    )
}