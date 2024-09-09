import React, { useState, useEffect } from 'react';
import { Container, Nav, NavDropdown,Navbar } from 'react-bootstrap';
import axios from 'axios';
import { Link ,useLocation} from 'react-router-dom';
import Footer from './Footer';



const AllExpense = () => {
    const location = useLocation();
    const { userData } = location.state || {};
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/Expense/GetAllExpenses`);
        if (Array.isArray(response.data)) {
          setExpenses(response.data);
        } else {
          console.error('Response data is not an array:', response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      }
    };
  
    fetchExpenses();
  }, []);
  return (
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
              <NavDropdown title="Progress" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/DailyProgressChart'>Today Progress</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ProfitLossChart">Multiple days Progress</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    <div className="container mt-4">
        


    <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>All Expenses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
        <p style={{ fontWeight: 'bold', color: 'white' }}>No expenses happened today.</p>

      ) : (
        <div className="row">
          {expenses.map((expense) => (
            <div key={expense.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Expense Title: {expense.Title}</h5>
                  <h6 className="card-text">Amount: {expense.Amount}</h6>
                  <h6 className="card-text">Date: {new Date(expense.Date).toLocaleDateString()}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default AllExpense;
