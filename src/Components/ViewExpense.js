import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Navbar, Nav ,NavDropdown} from 'react-bootstrap';
import { Link ,useLocation} from 'react-router-dom';
import Footer from './Footer';


function ViewExpense() {
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
return(
  <>
  <div style={{ backgroundImage: `url(${require('../assets/dash.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
       <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/AdminDashboard">Jay Visa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/AdminHome">Home</Nav.Link>
              <NavDropdown title="Client History" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/AllCustomerByDate'>Client Record by Date</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/AllCustomers'>All clients</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/ViewReminder">View Reminders</Nav.Link>
              <Nav.Link as={Link} to="/UpdateCustomerForm">Update Customer Form</Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/UpdatePasswordAdmin' state={{ userData: userData }}>Change Credentials</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/CreateReminder'>Create Reminders</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/ManageEmpolyees'>Manage Empolyees</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Expense" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/Expense'>Add Expense</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/ViewExpense'>View Expense</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/Signup">Signup</Nav.Link>
              <NavDropdown title="Progress" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/DailyProgressChart'>Today Progress</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ProfitLossChart">Multiple days Progress</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <Container>
        <div className="text-center mt-4">
        <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>View Expense</h1>
        </div>

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/DailyExpense'>
              <Button variant="primary" style={buttonStyle}>
                Today Expense
              </Button>
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/AllExpense'>
              <Button variant="primary" style={buttonStyle}>
                All Expenses
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

export default ViewExpense;
