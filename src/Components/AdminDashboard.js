import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../AdminDashboard.css';

const AdminDashboard = () => {
    const location = useLocation();
    const userData = location.state?.userData;
    const { firstName, lastName } = location.state?.userData || { firstName: 'User', lastName: '' };

    // Sample notifications data
    const [notifications, setNotifications] = useState([
        { id: 1, text: "John Doe reacted to your post", time: "10 mins ago" },
        { id: 2, text: "Richard Miles reacted to your post", time: "1 day ago" },
        { id: 3, text: "Brian Cumin reacted to your post", time: "1 day ago" },
        { id: 4, text: "Lance Bogrol reacted to your post", time: "1 day ago" }
    ]);

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Jay Visa</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/AdminDashboard">Home</Nav.Link>
                            <NavDropdown title="Client History" id="basic-nav-dropdown">
                                <Link to='/AllCustomerByDate' className="dropdown-item">Client Record by Date</Link>
                                <Link to='/AllCustomers' className="dropdown-item">All clients</Link>
                            </NavDropdown>
                            <Nav.Link href="/View Reminders">View Reminders</Nav.Link>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <Link to='/UpdatePasswordEmpolyee' state={{ userData: userData }} className="dropdown-item">Change Credentials</Link>
                                <Link to='/CreateReminder' className="dropdown-item">Create Reminders</Link>
                            </NavDropdown>
                            <Nav.Link href="/">Logout</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <Dropdown show={showDropdown} onToggle={toggleDropdown} align="end">
                                <Dropdown.Toggle as="a" className="nav-link text-white position-relative" onClick={toggleDropdown}>
                                    <FontAwesomeIcon icon={faBell} />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {notifications.length}
                                        <span className="visually-hidden">unread notifications</span>
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Header>Notifications</Dropdown.Header>
                                    {notifications.map((notification) => (
                                        <Dropdown.Item key={notification.id}>
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    <img src="https://via.placeholder.com/40" className="rounded-circle" alt="profile" />
                                                </div>
                                                <div>
                                                    <strong>{notification.text}</strong>
                                                    <div className="small text-muted">{notification.time}</div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    ))}
                                    <Dropdown.Divider />
                                    <Dropdown.Item className="text-center text-primary">View All</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <h1>Admin Dashboard</h1>
                <h2>Welcome {`${firstName} ${lastName}`}</h2>
                <h3 className="blink-text">Work on this page is progressing steadily over time.</h3>
            </Container>
        </div>
    );
};

export default AdminDashboard;
