import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar, Nav, NavDropdown, Modal, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../UpdateCustomerForm.css';

const UpdateCustomerForm = () => {
  const location = useLocation();
  const [customerData, setCustomerData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [receiptCount, setReceiptCount] = useState(1);
  const [customer, setCustomer] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [visaType, setVisaType] = useState('Study Visa');
  const [termDays, setTermDays] = useState('');
  const [balance, setBalance] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [consultancyFee, setConsultancyFee] = useState('');
  const [registrationFee, setRegistrationFee] = useState('');
  const [ticket, setTicket] = useState('');
  const [hotelBooking, setHotelBooking] = useState('');
  const [applicationForm, setApplicationForm] = useState('');
  const [travelInsurance, setTravelInsurance] = useState('');
  const [appointment, setAppointment] = useState('');
  const [notes, setNotes] = useState('');
  const [documents, setDocuments] = useState('');
  const [discount, setDiscount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [total, setTotal] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Fetch the data from the location or an API endpoint
    const fetchCustomerData = async () => {
      const data = location.state?.customerData || {}; // For demo purposes
      setCustomerData(data);
      setCustomer(data.customer || '');
      setDueDate(data.dueDate || '');
      setExpectedDate(data.expectedDate || '');
      setVisaType(data.visaType || 'Study Visa');
      setTermDays(data.termDays || '');
      setBalance(data.balance || '');
      setPaidBy(data.paidBy || '');
      setConsultancyFee(data.consultancyFee || '');
      setRegistrationFee(data.registrationFee || '');
      setTicket(data.ticket || '');
      setHotelBooking(data.hotelBooking || '');
      setApplicationForm(data.applicationForm || '');
      setTravelInsurance(data.travelInsurance || '');
      setAppointment(data.appointment || '');
      setNotes(data.notes || '');
      setDocuments(data.documents || '');
      setDiscount(data.discount || '');
      setPaidAmount(data.paidAmount || '');
      setRemainingAmount(data.remainingAmount || '');
      setTotal(data.total || '');
      setFirstName(data.firstName || '');
      setLastName(data.lastName || '');
    };

    fetchCustomerData();
  }, [location.state]);

  useEffect(() => {
    if (dueDate && expectedDate) {
      const dueDateObj = new Date(dueDate);
      const expectedDateObj = new Date(expectedDate);
      const diffTime = Math.abs(expectedDateObj - dueDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTermDays(diffDays);
    }
  }, [dueDate, expectedDate]);

  useEffect(() => {
    if (balance && discount && paidAmount) {
      const balanceNum = parseFloat(balance.replace(/,/g, '')) || 0;
      const discountNum = parseFloat(discount) || 0;
      const paidAmountNum = parseFloat(paidAmount) || 0;
      const totalAmount = balanceNum - discountNum;
      const remainingAmountNum = totalAmount - paidAmountNum;

      setRemainingAmount(remainingAmountNum.toFixed(2));
      setTotal(totalAmount.toFixed(2));
    }
  }, [balance, discount, paidAmount]);

  const handleSaveForm = () => {
    // Implement save logic here
    setSuccessMessage('Customer data updated successfully!');
  };

  const handleClearForm = () => {
    setShowClearConfirmation(true);
  };

  const handleConfirmClearList = () => {
    setCustomer('');
    setDueDate('');
    setExpectedDate('');
    setVisaType('Study Visa');
    setTermDays('');
    setBalance('');
    setPaidBy('');
    setConsultancyFee('');
    setRegistrationFee('');
    setTicket('');
    setHotelBooking('');
    setApplicationForm('');
    setTravelInsurance('');
    setAppointment('');
    setNotes('');
    setDocuments('');
    setDiscount('');
    setPaidAmount('');
    setRemainingAmount('');
    setTotal('');
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
              <Nav.Link href="/ViewReminderEmpolyee">View Reminders</Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <Link to='/UpdatePasswordEmpolyee' className="dropdown-item">Change Credentials</Link>
                <Link to='/CreateReminderEmployee' className="dropdown-item">Create Reminder</Link>
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
          Update Customer Form
        </h1>
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

        

      {/* Clear Confirmation Modal */}
      <Modal show={showClearConfirmation} onHide={handleCancelClearList}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to discard all changes?</Modal.Body>
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

      </Container>
    </div>
  );
};

export default UpdateCustomerForm;
