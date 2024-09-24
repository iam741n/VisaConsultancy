import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Nav, Modal, Card, NavDropdown, Navbar, Form, Alert } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Footer from './Footer';

const DailyProgressChart = () => {
    const location = useLocation();
    const { userData } = location.state || {};
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [date, setDate] = useState('');
    const [sales, setSales] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [profit, setProfit] = useState(0);

    useEffect(() => {
        fetchDailyProgress();
    }, []);

    const fetchDailyProgress = async () => {
        try {
            const response = await axios.get('https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/Progress/GetProgress');
            const progressData = response.data;
            setDate(progressData.Date);
            setSales(progressData.SalesToday);
            setExpenses(progressData.ExpenseToday);
            setProfit(progressData.ProfitToday);
            setData([{
                date: progressData.Date,
                sales: progressData.SalesToday,
                expenses: progressData.ExpenseToday,
                profit: progressData.ProfitToday,
            }]);
        } catch (error) {
            setError('Error fetching daily progress data.');
        }
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
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Daily Progress</h1>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart
                                        data={data}
                                        margin={{
                                            top: 20, right: 30, left: 20, bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} />
                                        <Line type="monotone" dataKey="expenses" stroke="#82ca9d" strokeWidth={3} />
                                        <Line type="monotone" dataKey="profit" stroke="#ffc658" strokeWidth={3} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs={12} md={8} lg={6} className="mx-auto">
                            <div className="card p-4">
                                <div className="row mb-3">
                                    <label htmlFor="salesToday" className="col-sm-6 col-form-label">Sales of today</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="salesToday" value={sales} readOnly />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="expenseToday" className="col-sm-6 col-form-label">Expense of today</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="expenseToday" value={expenses} readOnly />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="profitToday" className="col-sm-6 col-form-label">Profit of today</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="profitToday" value={profit} readOnly />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="date" className="col-sm-6 col-form-label">Date</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="date" value={date} readOnly />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default DailyProgressChart;
