import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fontSize } from "@mui/system";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function CollapsibleExample(props) {

    const nvgt = useNavigate();

    const goback = (e) => {
        e.preventDefault();
        const nav = () => nvgt("/Dashboard");
        nav();
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ padding: 10 }}>
            <Container>
                <Navbar.Brand onClick={goback} style={{cursor:'pointer'}}>{<HomeIcon fontSize="large" />}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"> </Nav>
                    <Nav>
                        <NavDropdown title="Sort" id="navbarScrollingDropdown" style={{ fontSize: '20px', marginRight: 100 }}>
                            <NavDropdown.Item href="#action3">Name_Asc</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Name_Dsc
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action5">
                                Followers_Dsc
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;