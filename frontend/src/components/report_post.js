import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from "axios";
import Modal from '@mui/material/Modal';


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

export default function Report_post({ post }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [inp_con, Setcon] = useState("");

    var info = JSON.parse(localStorage.getItem("info"));

    const AddReport = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        var conc = data.get('Concern')
        var d = new Date();
        var tosend = {
            by: info.email,
            whom: post.email,
            concern: conc,
            content: post.content,
            postid: post._id,
            subgid: post.subgid,
            isIgnored: 0,
            blocked: 0,
            creation_date: d
        }
        axios.post("http://localhost:7000/add_report", tosend)
            .then(res => {
                console.log(res.data);

                var d1 = new Date();
                var date = String(d1.getDate());
                var year = String(d1.getFullYear());
                var month = String(d1.getMonth() + 1);
                var total = date + "-" + month + "-" + year;

                var tosend2 = {
                    date: total,
                    subgid: post.subgid,
                    reported: 1,
                    deleted: 0
                }
                axios.post("http://localhost:7000/add_deletedata",tosend2)
                    .then(res2 => {
                        console.log(res2.data);
                        Setcon("");
                        handleClose();
                    })

            })
            .catch(err => {
                console.log(err);
            })
    }

    const Validate = () => {
        if (inp_con === '') return 1;
        return 0;
    }

    return (
        <>
            <Button
                style={{ marginTop: 10 }}
                variant="contained"
                onClick={handleOpen}
                color='success'
            >
                REPORT
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Report
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box component='form' onSubmit={AddReport}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Concern"
                                label="Concern"
                                name="Concern"
                                onChange={(e) => Setcon(e.target.value)}
                                value={inp_con}
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                style={{ marginTop: 20 }}
                                disabled={Validate()}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}