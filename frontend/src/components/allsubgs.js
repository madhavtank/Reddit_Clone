import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomeIcon from '@mui/icons-material/Home';
import Fuse from "fuse.js";


export default function AllSubgs() {

    const [allsubgs, setAllsubgs] = useState([]);
    const [defsubgs, setdefsubgs] = useState([]);
    const [search, setSearch] = useState('');

    const[Fusedata,Setfusedata] = useState("");

    const [help, Sethelp] = useState(0);
    var obj = window.localStorage.getItem("info");
    var info = JSON.parse(obj);
    const nvgt = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:7000/getAllsubgs")
            .then((res) => {
                // console.log(res.data);
                setAllsubgs(res.data);
                setdefsubgs(res.data);
            })
            .catch((err) => {
                console.log("error occured while fetching all subgs");
            })
    }, []);


    const isModerator = (mod) => {
        if (mod == info.email)
            return 1;
        else return 0;
    }

    const openthatSubg = (e, subg) => {
        e.preventDefault();
        localStorage.setItem("openthatsubg", JSON.stringify(subg));
        const nav = () => nvgt('/openthatsubg');
        nav();
    }

    const goback = (e) => {
        e.preventDefault();
        const nav = () => nvgt("/Dashboard");
        nav();
    }

    const onJoin = (event, subg) => {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();

        for (var i = 0; i < subg.once_leaved.length; i++) {
            if (info.email === subg.once_leaved[i]) {
                alert("You left this Subg once and you can't join now! (Please listen to Pachtaoge)")
                return 0;
            }
        }

        console.log(subg._id);
        console.log(info.email);
        var tosend = {
            id: subg._id,
            email: info.email,
            name: info.fname
        }
        axios.post("http://localhost:7000/create_joinreq", tosend)
            .then((res) => {
                console.log(res.data);
                if (res.data === 'already requested') {
                    alert('already requested');
                }
                else {
                    alert('requested');
                }
                console.log("success");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const Name_Asc = (e) => {
        // e.preventDefault();
        Sethelp(1);
        const currlist = allsubgs;
        const sort = currlist.sort((a, b) => (a.name < b.name) ? -1 : 1);
        console.log(sort);
        setAllsubgs(sort.filter((ele) => {
            return 1;
        }));
    }

    const Name_Dsc = (e) => {
        // e.preventDefault();
        Sethelp(1);
        const currlist = allsubgs;
        const sort = currlist.sort((a, b) => (a.name > b.name) ? -1 : 1);
        console.log(sort);
        setAllsubgs(sort.filter((ele) => {
            return 1;
        }));
    }

    const Creation_time = (e) => {
        // e.preventDefault();
        Sethelp(1);
        const currlist = allsubgs;
        const sort = currlist.sort((a, b) => {
            const a_date = Date.parse(a.creation_date);
            const b_date = Date.parse(b.creation_date);
            if(a_date<b_date) return -1;
            else return 1;
        });
        console.log(sort);
        setAllsubgs([...sort]);
    }

    const Followers_Dsc = (e) => {
        // e.preventDefault();
        Sethelp(1);
        const currlist = allsubgs;
        const sort = currlist.sort((a, b) => (a.people.length > b.people.length) ? -1 : 1);
        console.log(sort);
        setAllsubgs(sort.filter((ele) => {
            return 1;
        }));
    }

    const updateSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        console.log(search);
    }

    const updateFuzzy = (e) => {
        e.preventDefault();
        Setfusedata(e.target.value);
        // console.log(search);
    }

    const resetall = () => {
        setAllsubgs([...defsubgs]);
    }

    const SearchTags = (e) => {
        e.preventDefault();
        var a = new FormData(e.currentTarget);
        var input = a.get('search tags');
        if (input == '') {
            resetall();
            return;
        }
        const input_arr = input.split(",");
        console.log(input_arr);
        var ptr = 0;
        var final = [];
        for (var i = 0; i < defsubgs.length; i++) {
            const subg_tags = defsubgs[i].tags.split(",");
            var check = Array(input_arr.length).fill(0);
            for (var j = 0; j < input_arr.length; j++) {
                for (var k = 0; k < subg_tags.length; k++) {
                    if (input_arr[j] == subg_tags[k])
                        check[j] = 1;
                }
            }
            var ok = 1;
            for (var j = 0; j < input_arr.length; j++) {
                if (check[j] == 0)
                    ok = 0;
            }
            if (ok == 1) {
                final[ptr] = defsubgs[i];
                ptr++;
            }
        }
        setAllsubgs([...final]);
    }

    function IsJoined(subg) {
        if (isModerator(subg._id)) return 1;
        for (var i = 0; i < subg.people.length; i++) {
            if (subg.people[i] === info.email) return 1;
        }
        return 0;
    }

    const cmpfunc = (a, b) => {
        if (help === 1) return null;
        var aj = IsJoined(a);
        var bj = IsJoined(b);
        if (aj == 1 && bj == 0) return -1;
        return 1;
    }

    const onLeave = (event, id) => {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        var tosend = {
            subgid: id,
            email: info.email
        }
        axios.post("http://localhost:7000/leave_subg", tosend)
            .then((res) => {
                console.log(res.data);
                console.log("in leave subg");

                axios.post("http://localhost:7000/get_no_users", { subgid: id })
                    .then(res2 => {

                        var d = new Date();
                        var date = String(d.getDate());
                        var year = String(d.getFullYear());
                        var month = String(d.getMonth() + 1);
                        var total = date + "-" + month + "-" + year;

                        var tosend2 = {
                            date: total,
                            subgid: id,
                            users: res2.data.people.length
                        }
                        console.log("in 2nd", tosend2);
                        axios.post("http://localhost:7000/dec_gro_subg", tosend2)
                            .then(res3 => {
                                console.log("in 3rd", res3.data);
                                window.location.reload();
                            })
                            .catch(err3 => {
                                console.log(err3);
                            })
                    })
                    .catch(err2 => {
                        console.log(err2);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const once_leaved = (leaved) => {
        for (var i = 0; i < leaved.length; i++) {
            if (leaved[i] === info.email) return 1;
        }
        return 0;
    }

    let render = [];

    if(Fusedata==='' && allsubgs!==undefined) {
        render = allsubgs.filter((subg) => {
            if (search == '') {
                return subg;
            }
            else if (subg.name.toLowerCase().includes(search.toLowerCase())) {
                return subg;
            }
        }).sort(cmpfunc).map(subg => {
            return (
                <div className="container p-3 my-5 bg-light" style={styles.box} onClick={(e) => { openthatSubg(e, subg) }}>
                    <h3 className="text-center">{subg.name}</h3>
                    <ul className="list-group">
                        <li className="list-group-item" >
                            <span className="font-weight-bold">Number of People: </span>{subg.people.length}
                        </li>
                        <li className="list-group-item" >
                            <span className="font-weight-bold">Number of Posts: </span>{subg.posts.length}
                        </li>
                        <li className="list-group-item" >
                            <span className="font-weight-bold">Description: </span>{subg.des}
                        </li>
                        <li className="list-group-item" >
                            <span className="font-weight-bold">Tags: </span>{subg.tags}
                        </li>
                        <li className="list-group-item" >
                            <span className="font-weight-bold">Banned Keywords: </span>{subg.bk}
                        </li>
                    </ul>
                    {IsJoined(subg) ?
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{ marginTop: 10 }}
                            onClick={(e) => onLeave(e, subg._id)}
                            disabled={isModerator(subg.moderators)}
                        >
                            LEAVE
                        </button> :
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{ marginTop: 10 }}
                            onClick={(e) => onJoin(e, subg)}
                        >
                            JOIN
                        </button>
                    }
                </div>
            )
        })
    }
    else if (Fusedata!=='') {
        const fuse = new Fuse(allsubgs, { 
            keys: ["name"]    
       });    
        var temp = fuse.search(Fusedata);
        render = temp.map(subg=> {
            return (
                <div className="container p-3 my-5 bg-light" style={styles.box} onClick={(e) => { openthatSubg(e, subg.item) }}>
                    <h3 className="text-center">{subg.item.name}</h3>
                    <ul className="list-group">
                        <li className="list-group-item" >
                            <span className="font-weight-bold">Number of People: </span>{subg.item.people.length}
                        </li>
                        <li className="list-group-item" >
                            <span className="font-weight-bold">Number of Posts: </span>{subg.item.posts.length}
                        </li>
                        <li className="list-group-item" >
                            <span className="font-weight-bold">Description: </span>{subg.item.des}
                        </li>
                        <li className="list-group-item" >
                            <span className="font-weight-bold">Tags: </span>{subg.item.tags}
                        </li>
                        <li className="list-group-item" >
                            <span className="font-weight-bold">Banned Keywords: </span>{subg.item.bk}
                        </li>
                    </ul>
                    {IsJoined(subg.item) ?
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{ marginTop: 10 }}
                            onClick={(e) => onLeave(e, subg.item._id)}
                            disabled={isModerator(subg.item.moderators)}
                        >
                            LEAVE
                        </button> :
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{ marginTop: 10 }}
                            onClick={(e) => onJoin(e, subg.item)}
                        >
                            JOIN
                        </button>
                    }
                </div>
            )
        })
    }


    return (
        <div>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ padding: 10 }}>
                <Container>
                    <Navbar.Brand onClick={goback} style={{ cursor: 'pointer' }}>{<HomeIcon fontSize="large" />}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <NavDropdown title="Sort" id="navbarScrollingDropdown" style={{ fontSize: '20px', marginRight: 100 }}>
                                <NavDropdown.Item onClick={Name_Asc}>Name_Asc</NavDropdown.Item>
                                <NavDropdown.Item onClick={Name_Dsc}>
                                    Name_Dsc
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={Followers_Dsc}>
                                    Followers_Dsc
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={Creation_time}>
                                    Creation_time
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="me-auto"> </Nav>
                        <Nav>
                            <Form className="d-flex" onSubmit={SearchTags}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search By Name"
                                    className="me-2"
                                    aria-label="Search"
                                    name="search"
                                    onChange={updateSearch}
                                />
                                <Form.Control
                                    type="search"
                                    placeholder="Fuzzy Search"
                                    className="me-2"
                                    aria-label="Search"
                                    name="search"
                                    onChange={updateFuzzy}
                                />
                                <Form.Control
                                    type="search"
                                    placeholder="Search Tags"
                                    className="me-2"
                                    aria-label="Search"
                                    name="search tags"
                                    style={{ marginLeft: 10 }}
                                />
                                <Button
                                    variant="outline-success"
                                    type='submit'
                                >
                                    Submit</Button>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {render}
        </div>
    )
}

const styles = {
    box: {
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
        width: '50%',
        cursor: 'pointer'
    }
};