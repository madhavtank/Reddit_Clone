import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useEffect,useCallback } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fontSize } from "@mui/system";

function CollapsibleExample(props) {

  const nvgt=useNavigate();

  const handleKeyPress = useCallback((event) => {
    if(event.key==='U') {
      openusers(event);
    }
    else if(event.key==='J') {
      openJoinreq(event);
    }
    else if(event.key==='R') {
      openReported(event);
    }
    else if(event.key==='S') {
      openStats(event);
    }

  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const openReported=(e)=>{
    e.preventDefault();
    localStorage.setItem("inOpenSubg","0");
    const nav = () => nvgt('/opensubg_reported');
    nav();
  }

  const openusers=(e)=>{
    e.preventDefault();
    localStorage.setItem("inOpenSubg","0");
    const nav = () => nvgt("/opensubg_users");
    nav();
  }

  const goback=(e)=>{
    e.preventDefault();
    var inOpenSubg=localStorage.getItem("inOpenSubg");
    var url = (inOpenSubg==='1') ? "/mysubgs" : "/opensubg"; 
    const nav = () => nvgt(url);
    nav();
  }

  const openJoinreq=(e)=>{
    e.preventDefault();
    localStorage.setItem("inOpenSubg","0");
    const nav = () => nvgt("/opensubg_joinreq");
    nav();
  }

  const openStats=(e)=>{
    e.preventDefault();
    localStorage.setItem("inOpenSubg","0");
    const nav = () => nvgt("/opensubg_stats");
    nav();
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{padding:10}}>
      <Container>
        <Navbar.Brand onClick={goback} style={{cursor:'pointer'}}>{<ArrowBackIcon fontSize="large"/>}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/login-reg">Login</Nav.Link> */}
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item>Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link onClick={openusers} style={{fontSize:'20px'}}>Users</Nav.Link>
            <Nav.Link style={{fontSize:'20px',marginLeft:10,marginRight:10}} onClick={openJoinreq}>Join_Req</Nav.Link>
            <Nav.Link style={{fontSize:'20px',marginRight:10}} onClick={openStats}>Stats</Nav.Link>
            <Nav.Link onClick={openReported} style={{fontSize:'20px'}}>
              Reported
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;