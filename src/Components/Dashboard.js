import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Form, Button, Modal, Alert,NavDropdown } from 'react-bootstrap';
import { useLocation,Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios';
import html2canvas from 'html2canvas';
import '../Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const [receiptCount, setReceiptCount] = useState(1);
  const [customer, setCustomer] = useState('');
  const [dueDate, setDueDate] = useState('2024-06-26');
  const [termDays, setTermDays] = useState(0);
  const [expectedDate, setExpectedDate] = useState('2024-07-26');
  const [balance, setBalance] = useState('195,000');
  const [discount, setDiscount] = useState('0');
  const [paidAmount, setPaidAmount] = useState('0');
  const [paidBy, setPaidBy] = useState('');
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
  const [documents, setDocuments] = useState('');
  const [lastName, setLastName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // State for Clear Confirmation Modal
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

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
      PaidTo: `${firstName} ${lastName}`,
      Balance: parseFloat(balance.replace(/,/g, '')),
      Discount: parseFloat(discount),
      PaidAmount: parseFloat(paidAmount),
      RemainingAmount: parseFloat(remainingAmount),
      Total: parseFloat(total),
      CreatedAt: new Date().toISOString()
    };
  
    axios.post('http://localhost/Visa/api/Customer/post', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Form saved successfully:', response.data);
      setSuccessMessage('Form saved successfully!');
      setCustomer('');
      setDueDate('2024-06-26');
      setTermDays(0);
      setExpectedDate('2024-07-26');
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
      setFirstName(`${firstName}`);
      setDocuments('');
      setLastName(`${lastName}`);
    })
    .catch(error => {
      console.error('Error saving form:', error);
      alert(`Error: ${error.message}`);
    });
  };
  
  

  const handleClearForm = () => {
    setShowClearConfirmation(true);
  };

  const handleConfirmClearList = () => {
    setCustomer('');
    setDueDate('2024-06-26');
    setTermDays(0);
    setExpectedDate('2024-07-26');
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
    setShowClearConfirmation(false);
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
    <div style={{ backgroundImage: `url(${require('../assets/dash.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Jay Visa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Dashboard">Home</Nav.Link>
              <NavDropdown title="Client History" id="basic-nav-dropdown">
              <Link to='/AllCustomerByDate' className="dropdown-item">Client Record by Date</Link>
                <Link to='/AllCustomers' className="dropdown-item">All clients</Link>
                </NavDropdown>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <Link to='/UpdatePasswordEmpolyee' state={{ userData: userData }} className="dropdown-item">Change Credentials</Link>
                <Link to='/AddItems' className="dropdown-item">Add Items</Link>
                
              </NavDropdown>
              <Nav.Link href="/">Logout</Nav.Link>
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
          Customer Form
        </h1>
        <Form>
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
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Visa Type</Form.Label>
                <Form.Control
                  as="select"
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                >
                  <option>Study Visa</option>
                  <option>Visit Visa</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
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
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Balance</Form.Label>
                <Form.Control
                  type="text"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
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
                  value={`${firstName} ${lastName}`}
                  readOnly
                />
              </Form.Group>
            </Col>
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
          </Row>

          <Row className="mb-3">
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
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Tickets</Form.Label>
                <Form.Control
                  type="number"
                  value={ticket}
                  onChange={(e) => setTicket(e.target.value)}
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
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Application Form</Form.Label>
                <Form.Control
                  type="text"
                  value={applicationForm}
                  onChange={(e) => setApplicationForm(e.target.value)}
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
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Appointment</Form.Label>
                <Form.Control
                  type="text"
                  value={appointment}
                  onChange={(e) => setAppointment(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Notes</Form.Label>
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
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Documents</Form.Label>
                <Form.Control
                  type="text"
                  value={documents}
                  onChange={(e) => setDocuments(e.target.value)}
                />
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
              <div>PAID TO: {firstName} {lastName}</div>
              <div>VISA TYPE: {visaType}</div>
              <div>TICKET: {ticket}</div>
            </div>
            <div className="receipt-box">
              <div>RECEIPT NO: {receiptCount}</div>
              <div>CONSULTANCY FEE: {consultancyFee}</div>
              <div>REGISTRATION FEE: {registrationFee}</div>
              <div>HOTEL BOOKING: {hotelBooking}</div>
              <div>APPLICATION FORM: {applicationForm}</div>
              <div>TICKET: {ticket}</div>
              <div>TRAVEL INSURANCE: {travelInsurance}</div>
              <div>APPOINTMENT: {appointment}</div>
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

    
    </div>
  );
};

export default Dashboard;