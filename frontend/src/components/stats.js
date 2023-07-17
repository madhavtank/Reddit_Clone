import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js';

export default function Showstats() {

    var obj = JSON.parse(localStorage.getItem("curr_subg"));
    const [chartdata, SetChartdata] = useState([]);
    const [NO_users, SetNo_users] = useState([]);

    const [chartdata2, SetChartdata2] = useState([]);
    const [NO_posts, Setno_posts] = useState([]);

    const [chartdata3, SetChartdata3] = useState([]);
    const [NO_vis, Setno_vis] = useState([]);

    const [chartdata4, SetChartdata4] = useState([]);
    const [NO_rep, Setno_rep] = useState([]);
    const [NO_del, Setno_del] = useState([]);


    useEffect(() => {
        var tosend = {
            subgid: obj._id
        }
        axios.post("http://localhost:7000/get_growth", tosend)
            .then(res => {
                console.log(res.data);
                var dates = []
                var no_users = []
                res.data.map(instance => {
                    dates.push(instance.date);
                    no_users.push(instance.users)
                })
                console.log(dates);
                console.log(no_users);
                SetChartdata(dates);
                SetNo_users(no_users);
            })
    }, [])

    useEffect(() => {
        var tosend = {
            subgid: obj._id
        }
        axios.post("http://localhost:7000/get_postnumber", tosend)
            .then(res => {
                console.log(res.data);
                var dates = []
                var no_posts = []
                res.data.map(instance => {
                    dates.push(instance.date);
                    no_posts.push(instance.posts)
                })
                console.log(dates);
                console.log(no_posts);
                SetChartdata2(dates);
                Setno_posts(no_posts);
            })
    }, [])

    useEffect(() => {
        var tosend = {
            subgid: obj._id
        }
        axios.post("http://localhost:7000/get_vis", tosend)
            .then(res => {
                console.log(res.data);
                var dates = []
                var no_vis = []
                res.data.map(ins=>{
                    dates.push(ins.date);
                    no_vis.push(ins.visitors.length);
                })
                SetChartdata3(dates);
                Setno_vis(no_vis);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        var tosend = {
            subgid: obj._id
        }
        axios.post("http://localhost:7000/get_rep_del", tosend)
            .then(res => {
                console.log(res.data);
                var dates = []
                var no_rep = []
                var no_del = []
                res.data.map(ins=>{
                    dates.push(ins.date);
                    no_rep.push(ins.reported);
                    no_del.push(ins.deleted);
                })
                SetChartdata4(dates);
                Setno_rep(no_rep);
                Setno_del(no_del);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <div style={{ width: '50%', backgroundColor: 'white', borderRadius: '10px', marginTop: '2%' }} className="container">
                <Bar
                    data={{
                        labels: chartdata,
                        datasets: [
                            {
                                label: "Growth of the subg in terms of members over time",
                                data: NO_users,
                                fill: false,
                                backgroundColor: 'white',
                                borderWidth: 2,
                                borderColor: "black",
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: "Growth of this Subg",
                        },
                        legend: {
                            display: true,
                            position: 'right',
                        }
                    }}
                />
            </div>

            <div style={{ width: '50%', backgroundColor: 'white', borderRadius: '10px', marginTop: '2%', marginBottom: '2%' }} className="container">
                <Line
                    data={{
                        labels: chartdata2,
                        datasets: [
                            {
                                label: "Number of daily posts vs date",
                                data: NO_posts,
                                fill: false,
                                backgroundColor: 'white',
                                borderWidth: 2,
                                borderColor: "black",
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: "Daily posts",
                        },
                        legend: {
                            display: true,
                            position: 'right',
                        }
                    }}
                />
            </div>

            <div style={{ width: '50%', backgroundColor: 'white', borderRadius: '10px', marginTop: '2%', marginBottom: '2%' }} className="container">
                <Bar
                    data={{
                        labels: chartdata3,
                        datasets: [
                            {
                                label: "Number of daily visitors vs date",
                                data: NO_vis,
                                fill: false,
                                backgroundColor: 'white',
                                borderWidth: 2,
                                borderColor: "black",
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: "Daily visitors",
                        },
                        legend: {
                            display: true,
                            position: 'right',
                        }
                    }}
                />
            </div>

            <div style={{ width: '50%', backgroundColor: 'white', borderRadius: '10px', marginTop: '2%', marginBottom: '2%' }} className="container">
                <Line
                    data={{
                        labels: chartdata4,
                        datasets: [
                            {
                                label: "Reported posts",
                                data: NO_rep,
                                fill: false,
                                backgroundColor: 'white',
                                borderWidth: 2,
                                borderColor: "black",
                            },
                            {
                                label: "Deleted posts",
                                data: NO_del,
                                fill: false,
                                backgroundColor: 'white',
                                borderWidth: 2,
                                borderColor: "black",
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: "rep_del",
                        },
                        legend: {
                            display: true,
                            position: 'right',
                        }
                    }}
                />
            </div>
        </>
    )
} 