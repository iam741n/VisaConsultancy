import React, { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Nav, Modal, Card, NavDropdown, Navbar, Form, Alert } from 'react-bootstrap';
import Footer from './Footer';

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(248, 249, 250, 0.8); /* Adjusted for transparency */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #343a40;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FormLabel = styled.label`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const FormInput = styled.input`
  width: 100%;
`;

const ProfitLossChart = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [sales, setSales] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);
  const [days, setDays] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState([]);

  const fetchProgressForMultipleDays = async () => {
    try {
      const response = await axios.get(`https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/Progress/GetProgressforMultipledays?startDate=${startDate}&endDate=${endDate}`);
      const { Sales, Expense, Profit, Days, Date: dateRange } = response.data;
      console.log(response.data); // Log the response data

      setSales(Sales);
      setExpenses(Expense);
      setProfit(Profit);
      setDays(Days);

      // Assuming the Date field is a string representing a range, e.g., "01/07/2024 to 28/07/2024"
      const [start, end] = dateRange.split(' to ');
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);

      // Generate dates between start and end dates
      const dates = [];
      let currentDate = startDateObj;
      while (currentDate <= endDateObj) {
        dates.push(new Date(currentDate).toLocaleDateString());
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Create data for each date
      const data = dates.map(date => ({
        date,
        sales: Sales / Days,
        expenses: Expense / Days,
        profit: Profit / Days,
      }));

      setChartData(data);
    } catch (error) {
      console.error('Error fetching progress for multiple days:', error);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchProgressForMultipleDays();
  };

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
      <div>
        <ChartContainer>
          <Title>Monthly Profit and Loss</Title>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ff4d4d" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="container mt-4">
          <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Multiple Days Progress</h1>
          <CardContainer>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <FormLabel htmlFor="startDate" className="col-sm-6 col-form-label">Start Date</FormLabel>
                <div className="col-sm-6">
                  <FormInput type="date" className="form-control" id="startDate" value={startDate} onChange={handleStartDateChange} required />
                </div>
              </div>
              <div className="row mb-3">
                <FormLabel htmlFor="endDate" className="col-sm-6 col-form-label">End Date</FormLabel>
                <div className="col-sm-6">
                  <FormInput type="date" className="form-control" id="endDate" value={endDate} onChange={handleEndDateChange} required />
                </div>
              </div>
              <Button type="submit" variant="primary">Submit</Button>
            </form>
            <div className="row mt-4">
              <FormLabel htmlFor="sales" className="col-sm-6 col-form-label">Sales</FormLabel>
              <div className="col-sm-6">
                <FormInput type="text" className="form-control" id="sales" value={sales} readOnly />
              </div>
            </div>
            <div className="row mt-2">
              <FormLabel htmlFor="expenses" className="col-sm-6 col-form-label">Expenses</FormLabel>
              <div className="col-sm-6">
                <FormInput type="text" className="form-control" id="expenses" value={expenses} readOnly />
              </div>
            </div>
            <div className="row mt-2">
              <FormLabel htmlFor="profit" className="col-sm-6 col-form-label">Profit</FormLabel>
              <div className="col-sm-6">
                <FormInput type="text" className="form-control" id="profit" value={profit} readOnly />
              </div>
            </div>
            <div className="row mt-2">
            <FormLabel htmlFor="profit" className="col-sm-6 col-form-label">Date Range</FormLabel>
            <div className="col-sm-6">
            <FormInput type="text" className="form-control" id="dateRange" value={`${startDate} to ${endDate}`} readOnly />
            </div>
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProfitLossChart;
