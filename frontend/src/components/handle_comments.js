import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from "axios";

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

export default function Handle_com ({ post }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [AllCom,SetAllCom] = useState([]);
    const [inp_com,Setcom] = useState("");

    var info = JSON.parse(localStorage.getItem("info"));

    useEffect(()=>{
        axios.post("http://localhost:7000/get_all_comm",{post:post})
        .then((res)=>{
            SetAllCom(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const AddComment = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const com=data.get("Comment");
        console.log(com);
        console.log(post.content);
        var tosend = {
            cmail:info.email,
            comment:com,
            postid:post._id
        }
        axios.post("http://localhost:7000/add_com",tosend)
        .then((res)=>{
            console.log(res.data);
            SetAllCom([...AllCom,tosend])
        })
        .catch((err)=>{
            console.log(err);
        })
        Setcom("");
        handleClose();
    }
    const Validate = () => {
        if(inp_com==='')
        return 1;
        return 0;
    }

    return (
        <>
            <Button
                style={{ marginTop: 10 }}
                variant="contained"
                onClick={handleOpen}
            >
                COMMENTS
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add a Comment
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box component='form' onSubmit={AddComment}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Comment"
                                label="Comment"
                                name="Comment"
                                onChange={(e)=>Setcom(e.target.value)}
                                value={inp_com}
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
                        {AllCom.map(com => {
                            return (
                                <div className="container p-2 my-3 bg-dark" style={{ width: '100%', borderRadius: '10px' }}>
                                    <h6 className="text-center" style={{ color: 'white' }}>{com.cmail}</h6>
                                    <ul className="list-group">
                                        <li className="list-group-item" >
                                            <span className="font-weight-bold" style={{ fontWeight: 'bold' }}>Comment: </span> {com.comment}
                                        </li>
                                    </ul>
                                </div>
                            )
                        })}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}