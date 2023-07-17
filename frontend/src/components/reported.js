import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayReport from "./display_report";

export default function ShowReports() {

    var len = 1800000;
    const [allreports, Setall] = useState([]);
    const [todel, SetTodel] = useState([]);
    var subg_info = JSON.parse(localStorage.getItem("curr_subg"));
    var info = JSON.parse(localStorage.getItem("info"));

    useEffect(() => {
        var tosend = {
            subgid: subg_info._id
        }
        axios.post("http://localhost:7000/get_reports", tosend)
            .then(res => {
                console.log(res.data);
                Setall(res.data);
                console.log(allreports);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const onDelete = (e, report) => {
        e.preventDefault();
        console.log("in delete");
        var tosend = {
            postid: report.postid,
            subgid:report.subgid
        }
        axios.post("http://localhost:7000/delete_post_in_report", tosend)
            .then(res => {
                console.log(res.data);

                var d1 = new Date();
                var date = String(d1.getDate());
                var year = String(d1.getFullYear());
                var month = String(d1.getMonth() + 1);
                var total = date + "-" + month + "-" + year;

                var tosend2 = {
                    date: total,
                    subgid: subg_info._id,
                    reported: 0,
                    deleted: 1
                }
                console.log("in 1");
                axios.post("http://localhost:7000/add_deletedata", tosend2)
                    .then(res2 => {
                        console.log(res2.data);
                        console.log("in 2");
                        Setall(allreports.filter(ele => {
                            return ele.postid !== report.postid;
                        }))
                        window.location.reload();
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <div style={{ color: 'white' }}><h2><u><i>Reports</i></u></h2></div>
            {allreports.map(report => {
                return (
                    <DisplayReport report={report} onDelete={onDelete} />
                )
            })}
        </>
    )
}