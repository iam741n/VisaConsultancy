import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Ensure axios is installed
import AlarmModal from './AlarmModal'; // Import the AlarmModal component
import { parseISO, format, isWithinInterval, addMinutes } from 'date-fns'; // Import date-fns functions
import '../AdminDashboard.css';

const AdminDashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const { firstName, lastName } = location.state?.userData || { firstName: 'User', lastName: '' };

  const [reminders, setReminders] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);

  // Fetch reminders from API on component mount
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get('http://localhost/Visa/api/Reminder/GetReminders'); // Replace with your actual API endpoint
        setReminders(response.data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, []);

  // Check if any reminder matches the current time
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
  
      reminders.forEach((reminder) => {
        if (!reminder.Date || !reminder.Time) return;
  
        // Split reminder.Date and reminder.Time to ensure correct format
        const [year, month, day] = reminder.Date.split('-').map(num => parseInt(num, 10));
        const [hours, minutes] = reminder.Time.split(':').map(num => parseInt(num, 10));
  
        // Create a date object using parsed values
        const reminderDateTime = new Date(year, month - 1, day, hours, minutes);
  
        if (isNaN(reminderDateTime.getTime())) {
          console.error('Invalid date/time:', reminder.Date, reminder.Time);
          return;
        }
  
        // Check if the reminder's datetime matches the current datetime within a minute
        const timeDifference = Math.abs(now.getTime() - reminderDateTime.getTime());
        if (timeDifference < 60000) { // Check within a minute
          setCurrentReminder(reminder);
          setShowAlarm(true);
          // Play alarm sound
          new Audio('/alarm.mp3').play();
        }
      });
    };
  
    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, [reminders]);
  

  const handleSnooze = () => {
    // Implement snooze functionality here
    setShowAlarm(false);
  };

  const handleCloseAlarm = () => {
    setShowAlarm(false);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/AdminDashboard">Jay Visa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/AdminDashboard">Home</Nav.Link>
              <NavDropdown title="Client History" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/AllCustomerByDate'>Client Record by Date</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/AllCustomers'>All clients</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/ViewReminder">View Reminders</Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/UpdatePasswordEmpolyee' state={{ userData: userData }}>Change Credentials</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/CreateReminder'>Create Reminders</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/ManageEmpolyees'>Manage Empolyees</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Expense" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/Expense'>Add Expense</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/ViewExpense'>View Expense</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/">Logout</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Dropdown show={showDropdown} onToggle={toggleDropdown} align="end">
                <Dropdown.Toggle as="a" className="nav-link text-white position-relative" onClick={toggleDropdown}>
                  <FontAwesomeIcon icon={faBell} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {reminders.length}
                    <span className="visually-hidden">unread notifications</span>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>Notifications</Dropdown.Header>
                  {reminders.map((reminder) => (
                    <Dropdown.Item key={reminder.Id}>
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <FontAwesomeIcon icon={faClock} className="text-warning" style={{ fontSize: '40px' }} />
                        </div>
                        <div>
                          <strong>{reminder.Title}</strong>
                          <div className="small text-muted">
                            {format(parseISO(reminder.Date), 'MM/dd/yyyy')} {/* Date only */}
                          </div>
                          <div className="small text-muted">
                            {format(parseISO(`1970-01-01T${reminder.Time}:00`), 'hh:mm a')} {/* 12-hour time */}
                          </div>
                        </div>
                      </div>
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-center text-primary">
                    <Link to="/ViewReminder" className="text-primary text-decoration-none">View All</Link>
                  </Dropdown.Item>
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

      {showAlarm && currentReminder && (
        <AlarmModal
          show={showAlarm}
          onClose={handleCloseAlarm}
          onSnooze={handleSnooze}
          reminder={currentReminder}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
