import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Navbar, Nav ,NavDropdown} from 'react-bootstrap';
import { Link ,useLocation} from 'react-router-dom';
import Footer from './Footer';

function EmpolyeeHome() {
    const location = useLocation();
    const { userData } = location.state || {};
    const buttonStyle = {
      borderRadius: '25px',
      padding: '20px 40px',
    };
  
    const buttonContainerStyle = {
      textAlign: 'center',
    };
  
    const buttonContainerMargin = {
      marginTop: '20px',
    };
  
    const boldText = {
      fontWeight: 'bold',
      fontSize: '26px',
    };

    const firstName = userData?.firstName || '';
    const lastName = userData?.lastName || '';
return(
  <>
  <div style={{ backgroundImage: `url(${require('../assets/dash.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
       <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand href="#home">Jay Visa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/EmpolyeeHome">Home</Nav.Link>
                <Nav.Link href="/ViewReminderEmpolyee">View Reminders</Nav.Link>
                <Nav.Link href="/UpdateCustomerFormEmployee">Client Payments</Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <Link to='/UpdatePasswordEmpolyee' state={{ userData: userData }} className="dropdown-item">Change Credentials</Link>
                <Link to='/CreateReminderEmployee' className="dropdown-item">Create Reminder</Link>
                
              </NavDropdown>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <Container>
        <div className="text-center mt-4">
        <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Visa Home</h1>
        </div>

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/Dashboard' state={{ userData: { firstName, lastName } }}>
              <Button variant="primary" style={buttonStyle}>
               Study Visa
              </Button>
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/Dashboard2' state={{ userData: { firstName, lastName } }}>
              <Button variant="primary" style={buttonStyle}>
                Visit Visa
              </Button>
            </Link>
          </div>
        </div>

       
        {/* You can add more content here */}
      </Container>
 
      </div>
     <Footer/>
     </>
);
}

export default EmpolyeeHome;