import React, { useEffect, useState } from "react";
import axios from "axios";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { width } from "@mui/system";
import Handle_com from "./handle_comments";
import Report_post from "./report_post";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Openthatsubg() {

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    var obj = JSON.parse(localStorage.getItem("openthatsubg"));
    var info = JSON.parse(localStorage.getItem("info"));

    const [allposts, Setallposts] = useState([]);

    const [inp_cont, Setcon] = useState("");

    const isthatUser = (email) => {
        if (info.email === email) return 1;
        return 0;
    }

    const isBlocked = (user) => {
        for (var i = 0; i < obj.blocked_ppl.length; i++) {
            if (obj.blocked_ppl[i] === user)
                return 1;
        }
        return 0;
    }

    useEffect(() => {
        var tosend = {
            subgid: obj._id
        }
        axios.post("http://localhost:7000/get_all_posts", tosend)
            .then((res) => {
                Setallposts(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {

        var d = new Date();
        var date = String(d.getDate());
        var year = String(d.getFullYear());
        var month = String(d.getMonth() + 1);
        var total = date + "-" + month + "-" + year;

        var tosend = {
            user: info.email,
            subgid: obj._id,
            date: total
        }
        axios.post("http://localhost:7000/add_visitor", tosend)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const Create_Post = (e) => {
        e.preventDefault();

        if (isBlocked(info.email)) {
            alert("You are blocked");
            return;
        }
        const banned = obj.bk.split(",");

        var data = new FormData(e.currentTarget);
        var content = data.get("Content");

        var input = content.split(" ");
        var ok = 0;
        var arr = []
        var ptr = 0;
        for (var i = 0; i < input.length; i++) {
            var ok2 = 0;
            var cpy = input[i];
            cpy = cpy.toLowerCase();
            for (var k = 0; k < banned.length; k++) {
                var cpy2 = banned[k];
                cpy2 = cpy2.toLowerCase();
                if (cpy === cpy2) {
                    ok = 1;
                    ok2 = 1;
                    var str = "";
                    for (var j = 0; j < banned[k].length; j++) str += '*';
                    arr[ptr] = str;
                    ptr++;
                }
            }
            if (ok2 === 0) {
                arr[ptr] = input[i];
                ptr++;
            }
        }
        if (ok === 1)
            alert("Your post contains some banned keywords!")

        let new_con = arr.join(" ");
        content = new_con


        var tosend = {
            subgid: obj._id,
            email: info.email,
            content: content,
            upvotes: [],
            downvotes: [],
            comments: []
        }
        axios.post("http://localhost:7000/create_post", tosend)
            .then((res) => {
                console.log(res.data);

                var d = new Date();
                var date = String(d.getDate());
                var year = String(d.getFullYear());
                var month = String(d.getMonth() + 1);
                var total = date + "-" + month + "-" + year;

                var tosend2 = {
                    date: total,
                    subgid: obj._id,
                    posts: 1
                }

                axios.post("http://localhost:7000/inc_no_posts", tosend2)
                    .then(res3 => {
                        console.log(res3.data);
                        Setallposts([...allposts, tosend]);
                        Setcon("");
                        handleClose2();
                        window.location.reload();
                    })
                    .catch(err3 => {
                        console.log(err3);
                    })

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const Givelike = (e, post) => {
        e.preventDefault();

        for (var i = 0; i < post.upvotes.length; i++) {
            if (info.email === post.upvotes[i]) {
                alert("You already gave an upvote!")
                return 0;
            }
        }
        for (var i = 0; i < post.downvotes.length; i++) {
            if (info.email === post.downvotes[i]) {
                alert("You already gave a downvote!")
                return 0;
            }
        }

        var tosend = {
            post: post,
            email: info.email
        }
        axios.post("http://localhost:7000/give_like", tosend)
            .then((res) => {
                alert(res.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const GiveDislike = (e, post) => {
        e.preventDefault();

        for (var i = 0; i < post.upvotes.length; i++) {
            if (info.email === post.upvotes[i]) {
                alert("You already gave an upvote!")
                return 0;
            }
        }
        for (var i = 0; i < post.downvotes.length; i++) {
            if (info.email === post.downvotes[i]) {
                alert("You already gave a downvote!")
                return 0;
            }
        }

        var tosend = {
            post: post,
            email: info.email
        }
        axios.post("http://localhost:7000/give_dislike", tosend)
            .then((res) => {
                alert(res.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const Validate = () => {
        if (inp_cont === '') return 1;
        return 0;
    }

    const SavePost = (e, post) => {
        e.preventDefault();
        var tosend = {
            id: post._id,
            email: info.email
        }
        axios.post("http://localhost:7000/save_post", tosend)
            .then((res) => {
                console.log(res.data);
                if (res.data === "already saved") {
                    alert("Already saved");
                }
                else {
                    alert("Saved Successfully");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onFollow = (e, tofollow) => {
        e.preventDefault();
        var tosend = {
            to_follow: tofollow,
            want_to: info.email,
        }
        axios.post("http://localhost:7000/add_follower", tosend)
            .then(res => {
                alert(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <table style={{ width: '100%' }}>
            <tr>
                <td style={{ width: '25%', border: '5px solid blue', position: 'fixed', overflowY: 'scroll', backgroundColor: 'white' }}>
                    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '100%', height: '98vh' }}>
                        <span className="fs-4" style={{ fontWeight: 'bold' }}>{obj.name}</span>
                        <hr style={{ border: '2px solid black' }} />
                        <img src="https://media.istockphoto.com/id/589415708/photo/fresh-fruits-and-vegetables.jpg?s=1024x1024&w=is&k=20&c=mb1EBDCszi7HP1FxgCPNTh3N1IgV03_N4rCnO_AtStc=" />
                        <hr style={{ border: '2px solid black' }} />
                        <span className="fs-4">Description</span>
                        <hr style={{ border: '2px solid black' }} />
                        <div style={{ fontSize: '20px' }}><i>{obj.des}</i></div>
                        <hr style={{ border: '2px solid black' }} />
                    </div>
                </td>
                <td style={{ width: '75%' }}>

                    <Button
                        style={{ margin: 10 }}
                        variant="contained"
                        onClick={handleOpen2}
                    >
                        Create A Post
                    </Button>

                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Create A Post
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <Box component='form' onSubmit={Create_Post}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Content"
                                        label="Content"
                                        name="Content"
                                        onChange={(e) => Setcon(e.target.value)}
                                        value={inp_cont}
                                    />
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        fullWidth
                                        style={{ marginTop: 20 }}
                                        disabled={Validate()}
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </Typography>
                        </Box>
                    </Modal>

                    {allposts.map(post => {
                        return (
                            <div className="container p-3 my-3 bg-light" style={styles.box}>
                                <h4 className="text-center">{isBlocked(post.email) ? 'Blocked user' : post.email}</h4>
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
                                        className="btn btn-primary"
                                        style={{ marginTop: 10 }}
                                        onClick={(e) => Givelike(e, post)}
                                    >
                                        <ThumbUpIcon />
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ marginTop: 10 }}
                                        onClick={(e) => GiveDislike(e, post)}
                                    >
                                        <ThumbDownIcon />
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        style={{ marginTop: 10 }}
                                        onClick={(e) => SavePost(e, post)}
                                    >
                                        <BookmarkBorderOutlinedIcon />
                                    </button>
                                    <Handle_com post={post} />
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        style={{ marginTop: 10 }}
                                        disabled={isthatUser(post.email) || isBlocked(post.email)}
                                        onClick={(e) => onFollow(e, post.email)}
                                    >
                                        FOLLOW
                                    </button>
                                    <Report_post post={post} />
                                </div>
                            </div>
                        )
                    })}
                </td>
            </tr>
        </table>
    )
}

const styles = {
    box: {
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
        width: '60%',
    }
};