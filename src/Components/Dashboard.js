import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Form, Button, Modal, Alert,NavDropdown,Dropdown } from 'react-bootstrap';
import { useLocation,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell ,faClock} from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import axios from 'axios';
import html2canvas from 'html2canvas';
import AlarmModal from './AlarmModal'; // Import the AlarmModal component
import { parseISO, format, isWithinInterval, addMinutes } from 'date-fns'; // Import date-fns functions
import '../Dashboard.css';
import Footer from './Footer';

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const [receiptCount, setReceiptCount] = useState(1);
  const [customer, setCustomer] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [termDays, setTermDays] = useState(0);
  const [expectedDate, setExpectedDate] = useState('');
  const [balance, setBalance] = useState('195,000');
  const [discount, setDiscount] = useState('0');
  const [paidAmount, setPaidAmount] = useState('0');
  const [paidBy, setPaidBy] = useState('');
  const [paidTo, setPaidTo] = useState('');
  const [visaType, setVisaType] = useState('Study Visa');
  const [notes, setNotes] = useState('');
  const [consultancyFee, setConsultancyFee] = useState('0');
  const [registrationFee, setRegistrationFee] = useState('0');
  const [applicationForm, setApplicationForm] = useState('0');
  const [hotelBooking, setHotelBooking] = useState('0');
  const [travelInsurance, setTravelInsurance] = useState('0');
  const [appointment, setAppointment] = useState('0');
  const [ticket, setTicket] = useState('0');
  const [remainingAmount, setRemainingAmount] = useState('0');
  const [total, setTotal] = useState('0');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documents, setDocuments] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // State for Clear Confirmation Modal
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [showAlarm, setShowAlarm] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [passportno, setPassportNo] = useState('');  // Use useState instead of useEffect
  const [issuedate, setIssueDate] = useState('');    // Use useState instead of useEffect
  const [expirydate, setExpiryDate] = useState('');  // Use useState instead of useEffect
  const [monthsremaining, setMonthsremaining]= useState('');

  
  useEffect(() => {
    const fetchReminders = async () => {
        try {
            const response = await axios.get('https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/Reminder/GetReminders'); // Replace with your actual API endpoint
            setReminders(response.data);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    };

    fetchReminders();
}, []);

useEffect(() => {
  // Function to calculate and update balance
  const calculateBalance = () => {
    const consultancy = parseFloat(consultancyFee) || 0;
    const registration = parseFloat(registrationFee) || 0;
    const hotel = parseFloat(hotelBooking) || 0;
    const application = parseFloat(applicationForm) || 0;
    const insurance = parseFloat(travelInsurance) || 0;
    const app = parseFloat(appointment) || 0;

    // Calculate total fees
    const totalFees = consultancy + registration + hotel + application + insurance + app;
    
    // Update balance state
    setBalance(totalFees.toFixed(2));
  };

  // Recalculate balance when any fee changes
  calculateBalance();
}, [consultancyFee, registrationFee, hotelBooking, applicationForm, travelInsurance, appointment]);

useEffect(() => {
  if (issuedate && expirydate) {
    const issue = new Date(issuedate);
    const expiry = new Date(expirydate);

    const months =
      (expiry.getFullYear() - issue.getFullYear()) * 12 +
      (expiry.getMonth() - issue.getMonth());

    setMonthsremaining(months); 
  }
}, [issuedate, expirydate]);

// Conditional styling for months remaining field
const getMonthsRemainingStyle = () => {
  if (monthsremaining <= 9) {
    return { backgroundColor: '#F88379', borderColor: '#8B0000', color: '#721c24', fontWeight: 'bold' };
  } else if (monthsremaining > 9) {
    return { backgroundColor: '#90EE90', borderColor: '#008000', color: '#006400', fontWeight: 'bold' };
  }
  return {}; // Default styling
};

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

  useEffect(() => {
    const dueDateObj = new Date(dueDate);
    const expectedDateObj = new Date(expectedDate);
    const diffTime = Math.abs(expectedDateObj - dueDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTermDays(diffDays);
  }, [dueDate, expectedDate]);

  useEffect(() => {
    const balanceNum = parseFloat(balance.replace(/,/g, '')) || 0;
    const discountNum = parseFloat(discount) || 0;
    const paidAmountNum = parseFloat(paidAmount) || 0;
    const totalAmount = balanceNum - discountNum;
    const remainingAmountNum = totalAmount - paidAmountNum;

    setRemainingAmount(remainingAmountNum.toFixed(2));
    setTotal(totalAmount.toFixed(2));
  }, [balance, discount, paidAmount]);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
    }
  }, [userData]);

  const incrementReceiptCount = () => {
    setReceiptCount(prevCount => prevCount + 1);
  };

  const handleSaveForm = () => {
    const formData = {
        CustomerName: customer,
        DueDate: dueDate,
        ExpectedDate: expectedDate,
        TermDays: termDays,
        Documents: documents,
        VisaType: visaType,
        Notes: notes,
        ConsultancyFee: parseFloat(consultancyFee),
        RegistrationFee: parseFloat(registrationFee),
        ApplicationForm: parseFloat(applicationForm),
        HotelBooking: parseFloat(hotelBooking),
        TravelInsurance: parseFloat(travelInsurance),
        Appointment: parseFloat(appointment),
        Tickets: parseInt(ticket),
        PaidBy: paidBy,
        PaidTo: paidTo,
        Balance: parseFloat(balance.replace(/,/g, '')),
        Discount: parseFloat(discount),
        PaidAmount: parseFloat(paidAmount),
        RemainingAmount: parseFloat(remainingAmount),
        Total: parseFloat(total),
        CreatedAt: new Date().toISOString(),
        PassportNo: passportno,
        PassportIssueDate: issuedate,
        PassportExpiryDate: expirydate
        
    };

    axios.post('https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/Customer/post', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Form saved successfully:', response.data);
        setSuccessMessage('Form saved successfully!');
        // Clear form fields
        setCustomer('');
        setDueDate('');
        setTermDays(0);
        setExpectedDate('');
        setBalance('0');
        setDiscount('0');
        setPaidAmount('0');
        setPaidBy('');
        setVisaType('Study Visa');
        setNotes('');
        setConsultancyFee('0');
        setRegistrationFee('0');
        setApplicationForm('0');
        setHotelBooking('0');
        setTravelInsurance('0');
        setAppointment('0');
        setTicket('0');
        setRemainingAmount('0');
        setTotal('0');
        setFirstName('');
        setDocuments('');
        setLastName('');
        setPassportNo('');
        setIssueDate('');
        setExpiryDate('');
        setPaidTo('');
    })
    .catch(error => {
        console.error('Error saving form:', error);
        alert(`Error: ${error.message}`);
    });
    incrementReceiptCount();
};

  
  

  const handleClearForm = () => {
    setShowClearConfirmation(true);
  };

  const handleConfirmClearList = () => {
    setCustomer('');
    setDueDate('');
    setTermDays(0);
    setExpectedDate('');
    setBalance('0');
    setDiscount('0');
    setPaidAmount('0');
    setPaidBy('');
    setVisaType('');
    setNotes('');
    setConsultancyFee('');
    setRegistrationFee('');
    setApplicationForm('');
    setHotelBooking('');
    setTravelInsurance('');
    setAppointment('');
    setTicket('0');
    setRemainingAmount('0');
    setTotal('0');
    setDocuments('');
    setPassportNo('');
    setIssueDate('');
    setExpiryDate('');
    setShowClearConfirmation(false);
    setPaidTo('');
  };

  const handleCancelClearList = () => {
    setShowClearConfirmation(false);
  };

  const handleGenerateReceipt = () => {
    const input = document.getElementById('receipt'); // Assuming 'receipt' is the ID of your receipt container
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('receipt.pdf');
      });
  };

  return (
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
            <Nav className="ms-auto">
                            <Dropdown show={showDropdown} onToggle={toggleDropdown} align="end">
                            <Dropdown.Toggle as="a" className="nav-link text-white position-relative" onClick={toggleDropdown}>
                              <FontAwesomeIcon icon={faBell} />
                              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                               {receiptCount}
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
                    <Link to="/ViewReminderEmpolyee" className="text-primary text-decoration-none">View All</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="container">
        <h1
          className="text-center mt-4"
          style={{
            color: 'White',
            fontFamily: 'Arial, sans-serif',
            fontSize: '2.5rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            fontWeight: 'bold'
          }}
        >
          Customer Form for Empolyee for Study Visa
        </h1>
        <Form>
            {/* Warning message for passport expiration */}
      {issuedate && expirydate && monthsremaining <= 9 && (
        <div style={{ color: 'red', fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>
         <h3>Your Passport is Expiring Soon!</h3> 
        </div>
        )}
          <Row className="mb-3">
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Phone No</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={documents}
                  onChange={(e) => setDocuments(e.target.value)}
                />
              </Form.Group>
            </Col>
           
            
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Passport no</Form.Label>
                <Form.Control
                  type="text"
                  value={passportno}
                  onChange={(e) => setPassportNo(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Issue Date</Form.Label>
                <Form.Control
                  type="date"
                  value={issuedate}
                  onChange={(e) => setIssueDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  value={expirydate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
            <Form.Group>
            <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>
              Months Remaining
            </Form.Label>
            <Form.Control
              type="number"
              value={monthsremaining}
              onChange={(e) => setMonthsremaining(e.target.value)}
              disabled
              style={getMonthsRemainingStyle()}
            />
          </Form.Group>
          </Col>
          </Row>

          <Row className="mb-3">
          <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Expected Date</Form.Label>
                <Form.Control
                  type="date"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Term Days</Form.Label>
                <Form.Control
                  type="number"
                  value={termDays}
                  readOnly
                />
              </Form.Group>
            </Col>
          
        
           
           
          </Row>
         

          <Row className="mb-3">
          
        <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Consultancy Fee</Form.Label>
                <Form.Control
                  type="text"
                  value={consultancyFee}
                  onChange={(e) => setConsultancyFee(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>University Fee</Form.Label>
                <Form.Control
                  type="text"
                  value={applicationForm}
                  onChange={(e) => setApplicationForm(e.target.value)}
            
                />
              </Form.Group>
            </Col>
            
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Hotel Booking</Form.Label>
                <Form.Control
                  type="text"
                  value={hotelBooking}
                  onChange={(e) => setHotelBooking(e.target.value)}
                />
              </Form.Group>
            </Col>
           
          </Row>

          <Row className="mb-3">
          
            {/* <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Tickets</Form.Label>
                <Form.Control
                  type="number"
                  value={ticket}
                  onChange={(e) => setTicket(e.target.value)}
                />
              </Form.Group>
            </Col> */}
          

          <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Registration Fee</Form.Label>
                <Form.Control
                  type="text"
                  value={registrationFee}
                  onChange={(e) => setRegistrationFee(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Travel Insurance</Form.Label>
                <Form.Control
                  type="text"
                  value={travelInsurance}
                  onChange={(e) => setTravelInsurance(e.target.value)}
                />
              </Form.Group>
            </Col>
            {/* <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Appointment</Form.Label>
                <Form.Control
                  type="text"
                  value={appointment}
                  onChange={(e) => setAppointment(e.target.value)}
                />
              </Form.Group>
            </Col> */}
            <Col>
          <Form.Group>
            <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Balance</Form.Label>
            <Form.Control
              type="text"
              value={balance}
              readOnly
            />
          </Form.Group>
        </Col>
          </Row>

          <Row className="mb-2">
          <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Paid by</Form.Label>
                <Form.Control
                  type="text"
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                />
              </Form.Group>
            </Col>
          <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Paid to</Form.Label>
                <Form.Control
                  type="text"
                  value={paidTo}
                  onChange={(e) => setPaidTo(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Visa Type</Form.Label>
                <Form.Control
                  as="select"
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                >
                  <option>Study Visa</option>
                </Form.Control>
              </Form.Group>
            </Col>
         
          </Row>
          

          

          

          

          <div className="box-container">
            <Row className="mb-3">
              <Col>
                <Form.Group>
                <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Sub Total:</Form.Label>
                  <Form.Control
                    type="text"
                    value={balance}
                    readOnly
                    className="form-control-small"
                  />
                </Form.Group>
                <Form.Group>
                <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Discount:</Form.Label>
                  <Form.Control
                    type="text"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="form-control-small"
                  />
                </Form.Group>
                <Form.Group>
                <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Paid Amount:</Form.Label>
                  <Form.Control
                    type="text"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    className="form-control-small"
                  />
                </Form.Group>
                <Form.Group>
                <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Remaining Amount:</Form.Label>
                  <Form.Control
                    type="text"
                    value={remainingAmount}
                    readOnly
                    className="form-control-small"
                  />
                </Form.Group>
                <Form.Group>
                <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Total:</Form.Label>
                  <Form.Control
                    type="text"
                    value={total}
                    readOnly
                    className="form-control-small"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <Row className="mb-3">
          <Col>
          
            <Button style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }} variant="primary" onClick={handleSaveForm}>
              Save
            </Button>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
          </Col>
          <Col>
            <Button variant="warning" onClick={handleClearForm}>
              Clear
            </Button>
          </Col>
          <Col>
            <Button variant="info" onClick={handleGenerateReceipt}>
              Generate Receipt
            </Button>
          </Col>
        </Row>

        </Form>
      </Container>
       

      {/* Clear Confirmation Modal */}
      <Modal show={showClearConfirmation} onHide={handleCancelClearList}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to discard all the items?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClearList}>No</Button>
          <Button variant="danger" onClick={handleConfirmClearList}>Yes</Button>
        </Modal.Footer>
      </Modal>
      <div id="receipt" className="receipt-container">
          <div className="receipt-header">RECEIPT OF PAYMENT</div>
          <div className="receipt-section">
            <div className="receipt-box">
              <div>CLIENT NAME: {customer}</div>
              <div>PAID BY: {paidBy}</div>
              <div>PAID TO: {paidTo}</div>
              <div>VISA TYPE: {visaType}</div>
              
            </div>
            <div className="receipt-box">
              <div>RECEIPT NO: {receiptCount}</div>
              <div>CONSULTANCY FEE: {consultancyFee}</div>
              <div>REGISTRATION FEE: {registrationFee}</div>
              <div>HOTEL BOOKING: {hotelBooking}</div>
              <div>UNIVERSITY FEE: {applicationForm}</div>
              <div>TRAVEL INSURANCE: {travelInsurance}</div>
             
            </div>
          </div>
          <div className="receipt-summary">
            <div>SUBTOTAL: {balance}</div>
            <div>Discount: {discount}</div>
            <div>RECEIVED: {paidAmount}</div>
            <div>REMAINING: {remainingAmount}</div>
            <div>Total Amount: {total}</div>
          </div>
        
          <div className="receipt-logo">
            <img src="logo.png" alt="Jay Visa Logo" />
          </div>
          <div className="receipt-note">
            IN CASE OF VISA REFUSAL OR CASE WITHDRAWAL, PAID CONSULTANCY FEE IS NON-REFUNDABLE.
          </div>
          <div className="receipt-footer">
            DATE: {dueDate}
          </div>
        </div>

        {showAlarm && currentReminder && (
        <AlarmModal
          show={showAlarm}
          onClose={handleCloseAlarm}
          onSnooze={handleSnooze}
          reminder={currentReminder}
        />
      )}

    
    </div>
     <Footer/>
     </>
  );
};

export default Dashboard;
