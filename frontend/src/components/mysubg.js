import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import DataDisplayContainer from './Entry';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Subg() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [inp_name, Setname] = useState("");
    const [inp_des, Setdes] = useState("");

    const Validate = () => {
        if (inp_name === '' || inp_des === '') return 1;
        return 0;
    }

    var obj = window.localStorage.getItem("info");
    var info = JSON.parse(obj);

    const [subgs, setSubgs] = React.useState([]);

    React.useEffect(() => {
        var tosend = {
            email: info.email
        }
        axios.post("http://localhost:7000/getsubgs", tosend)
            .then((response) => {
                console.log(response.data);
                setSubgs(response.data);
            })
    }, [])

    function handleDelete(id) {
        console.log("here");
        var to = {
            id: id
        }
        axios.post("http://localhost:7000/remsubg", to)
            .then((response) => {
                alert("Deleted Successfully!")
                console.log(response.data);
                axios.post("http://localhost:7000/rem_saved_delete_subg", { posts: response.data })
                    .then(res => {
                        console.log(res.data);
                    })
            })
            .catch((err) => {
                alert("Couldn't delete!");
            })
        setSubgs(subgs.filter((subg) => {
            return subg._id !== id;
        }))
    }

    function showsubg(subg) {
        return (
            <DataDisplayContainer data={subg} handleDelete={handleDelete} />
        )
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        var init_ppl = [info.email];
        var init_posts = [];

        var blocked = [];
        var d = new Date();

        var tosend = {
            name: data.get("Name"),
            des: data.get("Description"),
            tags: data.get("Tags"),
            bk: data.get("Banned Keywords"),
            people: init_ppl,
            posts: init_posts,
            moderators: info.email,
            blocked_ppl: blocked,
            creation_date: d
        }

        axios.post("http://localhost:7000/subg", tosend)
            .then((response) => {
                console.log(response.data);
                setSubgs([...subgs, tosend]);
                Setdes("");
                Setname("");
                handleClose();
                window.location.reload();
            })
            .catch((err) => {
                console.log("Error!!!");
            })
    }

    return (
        <div>
            <Button onClick={handleOpen} style={{ marginTop: 40 }} variant="contained">Add a Sub Greddiit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Fill the data
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box component='form' onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Name"
                                label="Name"
                                name="Name"
                                onChange={(e) => Setname(e.target.value)}
                                value={inp_name}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Description"
                                label="Description"
                                name="Description"
                                onChange={(e) => Setdes(e.target.value)}
                                value={inp_des}
                            />
                            <TextField
                                margin="normal"
                                multiline
                                fullWidth
                                id="Tags"
                                label="Tags"
                                name="Tags"
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="Banned Keywords"
                                label="Banned Keywords"
                                name="Banned Keywords"
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
            <div className='dictionary'>{subgs.map(showsubg)}</div>
        </div>
    );
}