import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DisplayReport({ report,onDelete }) {

    const [isIgnored, SetisIgnored] = useState(report.isIgnored);
    const [count, setCount] = useState(5);
    const [isCounting, setIsCounting] = useState(false);
    const [blocked,Setblocked] = useState(report.blocked);

    useEffect(() => {
        let intervalId;
        if (isCounting) {
            intervalId = setInterval(() => {
                setCount((prevCount) => {
                    if (prevCount > 1) {
                        return prevCount - 1;
                    } else {
                        clearInterval(intervalId);
                        setIsCounting(false);
                        Tocall();
                        return 0;
                    }
                });
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isCounting]);
    
    const handleClick = () => {
        setCount(5);
        setIsCounting(!isCounting);
    };

    const Tocall = () => {
        console.log("hi");
        var tosend = {
            person:report.whom,
            subgid:report.subgid,
            reportid:report._id
        }
        axios.post("http://localhost:7000/block_user",tosend)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
        Setblocked(1);
    }

    const onIgnore = (e) => {
        e.preventDefault();
        console.log(report);
        var tosend = {
            id: report._id
        }
        axios.post("http://localhost:7000/onIgnore", tosend)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        SetisIgnored(1);
    }


    return (
        <div className="container p-2 my-3 bg-light" style={styles.box}>
            <ul className="list-group">
                <li className="list-group-item" >
                    <span className="font-weight-bold">Reported by: </span> {report.by}
                </li>
                <li className="list-group-item" >
                    <span className="font-weight-bold">Reported of: </span> {report.whom}
                </li>
                <li className="list-group-item" >
                    <span className="font-weight-bold">Text: </span> {report.content}
                </li>
                <li className="list-group-item" >
                    <span className="font-weight-bold">Concern: </span> {report.concern}
                </li>
            </ul>
            <div className="d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginTop: 10 }}
                    onClick={handleClick}
                    disabled={isIgnored || blocked}
                >
                    {isCounting ? `Cancel in ${count} secs` : 'Block User'}
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginTop: 10 }}
                    disabled={isIgnored || blocked}
                    onClick={(e)=>onDelete(e,report)}
                >
                    Delete Post
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginTop: 10 }}
                    onClick={onIgnore}
                    disabled={blocked}
                >
                    Ignore
                </button>
            </div>
        </div>
    )
}

const styles = {
    box: {
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
        width: '50%'
    }
};