import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Handle_com from './handle_comments'

export default function Showsaved() {

    const [allSaved, SetallSaved] = useState([]);
    const [data, Setdata] = useState([]);
    var info = JSON.parse(localStorage.getItem("info"));
    var renderlist = []

    useEffect(() => {
        var tosend = {
            email: info.email
        }
        axios.post("http://localhost:7000/get_saved", tosend)
            .then((res) => {
                console.log(res.data);
                SetallSaved(res.data);
                // renderlist=[...res.data];
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const func = async (postid) => {
        const res = await axios.post("http://localhost:7000/get_saved_data", { postid: postid });
        return res.data;
    }

    useEffect(() => {
        console.log(allSaved);
        Promise.all(allSaved.map(postid => {
            return func(postid);
        }))
        .then((result)=>{
            console.log(result);
            Setdata(result)
        })
    }, [allSaved])

    const Ondelete = (e, id) => {
        e.preventDefault();
        var tosend = {
            email: info.email,
            postid: id
        }
        axios.post("http://localhost:7000/rem_saved", tosend)
            .then(res => {
                console.log(res.data);
            })
        SetallSaved(allSaved.filter((ele) => {
            return ele !== id;
        }))
    }

    return (
        <>
            <div style={{ color: 'white' }}><h2><u><i>Saved Posts</i></u></h2></div>
            {data.map(post => {
                return (
                    <div className="container p-3 my-3 bg-light" style={styles.box}>
                        <h4 className="text-center">{post.email}</h4>
                        <ul className="list-group">
                            <li className="list-group-item" >
                                <span className="font-weight-bold" style={{ fontWeight: 'bold' }}>Post: </span>{post.content}
                            </li>
                            <li className="list-group-item" >
                                <span className="font-weight-bold">Upvotes: </span>{post.upvotes.length}
                            </li>
                            <li className="list-group-item" >
                                <span className="font-weight-bold">Downvotes: </span>{post.downvotes.length}
                            </li>
                        </ul>
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-danger"
                                style={{ marginTop: 10 }}
                                onClick={(e)=>Ondelete(e,post._id)}
                            >
                                <DeleteIcon/>
                            </button>
                            <Handle_com post={post}/>
                        </div>
                    </div>
                )
            })} 
        </>
    )
}

const styles = {
    box: {
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
        width: '45%',
    }
};