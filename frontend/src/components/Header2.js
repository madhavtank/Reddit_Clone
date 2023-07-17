import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { fontSize } from "@mui/system";

function CollapsibleExample(props) {

  const nvgt=useNavigate();

  const logout=(e)=>{
    e.preventDefault();
    window.localStorage.setItem("ok","0");
    const nav = () => nvgt('/');
    nav();
  }

  const openprofile=(e)=>{
    e.preventDefault();
    const nav = () => nvgt("/Dashboard/profile");
    nav();
  } 

  const goback=(e)=>{
    e.preventDefault();
    const nav = () => nvgt("/Dashboard");
    nav();
  }

  const openMySubg=(e)=>{
    e.preventDefault();
    const nav = () => nvgt("/mysubgs");
    nav();
  }

  const openAllSubgs=(e)=>{
    e.preventDefault();
    const nav = () => nvgt("/allsubgs");
    nav();
  }

  const openSaved=(e)=>{
    e.preventDefault();
    const nav = () => nvgt("/saved_posts");
    nav();
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{padding:10}}>
      <Container>
        <Navbar.Brand onClick={goback} style={{cursor:'pointer'}}>{<HomeIcon fontSize="large"/>}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link onClick={openprofile}>{<AccountCircleIcon fontSize="large"/>}</Nav.Link>
            <Nav.Link style={{fontSize:'20px',marginLeft:10,marginRight:10}} onClick={openMySubg}>MySubgs</Nav.Link>
            <Nav.Link style={{fontSize:'20px',marginRight:10}} onClick={openAllSubgs}>AllSubgs</Nav.Link>
            <Nav.Link style={{fontSize:'20px',marginRight:10}} onClick={openSaved}>Saved</Nav.Link>
            <Nav.Link eventKey={2} onClick={logout}>
              {<LogoutIcon fontSize="large"/>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;