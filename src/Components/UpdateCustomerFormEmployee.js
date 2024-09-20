import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar, Nav, NavDropdown, Modal, Alert,Dropdown,ButtonGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import '../UpdateCustomerForm.css';
import Footer from './Footer';

const UpdateCustomerFormEmployee = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [receiptCount, setReceiptCount] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [visaType, setVisaType] = useState('Study Visa');
  const [termDays, setTermDays] = useState('');
  const [balance, setBalance] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [paidTo, setPaidTo] = useState('');
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
  const [customerId, setCustomerId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [passportno, setPassportNo] = useState('');  // Use useState instead of useEffect
  const [issuedate, setIssueDate] = useState('');    // Use useState instead of useEffect
  const [expirydate, setExpiryDate] = useState('');  // Use useState instead of useEffect
  const [monthsremaining, setMonthsremaining]= useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https:/apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/Customer/GetAllCustomers');
            setCustomerData(response.data);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    fetchCustomers();
}, []);

useEffect(() => {
    if (selectedCustomer) {
        const customer = customerData.find(c => c.customer_name === selectedCustomer);
        if (customer) {
            // Debugging output
            console.log("Fetched customer data:", customer);

            // Convert backend date format to YYYY-MM-DD
            const formatDate = (dateStr) => {
                const date = new Date(dateStr);
                console.log("Parsed date:", date); // Debugging output
                return date.toISOString().split('T')[0];
            };

            // Debugging output
          
            setDueDate(formatDate(customer.due_date));
            setCustomerId(customer.id);
            setExpectedDate(formatDate(customer.expected_date));
            setVisaType(customer.visa_type);
            setTermDays(customer.term_days);
            setBalance(customer.balance);
            setPaidBy(customer.paid_by);
            setPaidTo(customer.paid_to);
            setConsultancyFee(customer.consultancy_fee);
            setRegistrationFee(customer.registration_fee);
            setTicket(customer.tickets);
            setHotelBooking(customer.hotel_booking);
            setApplicationForm(customer.application_form);
            setTravelInsurance(customer.travel_insurance);
            setAppointment(customer.appointment);
            setNotes(customer.notes);
            setDocuments(customer.documents);
            setDiscount(customer.discount);
            setPaidAmount(customer.paid_amount);
            setRemainingAmount(customer.remaining_amount);
            setTotal(customer.total);
            setPassportNo(customer.passport_no);
            setIssueDate(formatDate(customer.passport_issue_date)); // Use formatDate function
            setExpiryDate(formatDate(customer.passport_expiry_date)); // Use formatDate function
            setMonthsremaining(customer.months_remaining);
        }
    }
}, [selectedCustomer, customerData]);

  

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
    if (typeof balance === 'string' || typeof balance === 'number') {
      const balanceStr = typeof balance === 'string' ? balance : balance.toString();
      const discountNum = parseFloat(discount) || 0;
      const paidAmountNum = parseFloat(paidAmount) || 0;
  
      const balanceNum = parseFloat(balanceStr.replace(/,/g, '')) || 0;
  
      const totalAmount = balanceNum - discountNum;
      const remainingAmountNum = totalAmount - paidAmountNum;
  
      setRemainingAmount(remainingAmountNum.toFixed(2));
      setTotal(totalAmount.toFixed(2));
    } else {
      console.error('Invalid input types for balance, discount, or paidAmount');
    }
  }, [balance, discount, paidAmount]);
  

  const incrementReceiptCount = () => {
    setReceiptCount(prevCount => prevCount + 1);
  };


  const handleSaveForm = async () => {
    // Validate required fields
    if (!selectedCustomer || !dueDate || !expectedDate || !paidBy || !paidTo || !visaType) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const updatedCustomer = {
        CustomerName: selectedCustomer,
        DueDate: new Date(dueDate).toISOString(),
        ExpectedDate: new Date(expectedDate).toISOString(),
        VisaType: visaType,
        TermDays: parseInt(termDays, 10),
        Documents: documents,
        Notes: notes,
        ConsultancyFee: parseFloat(consultancyFee),
        RegistrationFee: parseFloat(registrationFee),
        ApplicationForm: parseFloat(applicationForm),
        HotelBooking: parseFloat(hotelBooking),
        TravelInsurance: parseFloat(travelInsurance),
        Appointment: parseFloat(appointment),
        Tickets: parseInt(ticket, 10),
        PaidBy: paidBy,
        PaidTo: paidTo,
        Balance: parseFloat((balance || "").toString().replace(/,/g, '')),
        Discount: parseFloat(discount),
        PaidAmount: parseFloat(paidAmount),
        RemainingAmount: parseFloat(remainingAmount),
        Total: parseFloat(total),
        CreatedAt: new Date().toISOString(),
        PassportNo: passportno, // New field
        PassportIssueDate: new Date(issuedate).toISOString(), // New field
        PassportExpiryDate: new Date(expirydate).toISOString() // New field
      };

      console.log("Request Data:", updatedCustomer);

      const response = await axios.put(`https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/customer/UpdateCustomer/${customerId}`, updatedCustomer, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setSuccessMessage("Customer data updated successfully!");
        console.log("Customer data updated successfully!");
        setErrorMessage('');
      } else {
        setErrorMessage("Failed to update customer data.");
      }
    } catch (error) {
      console.error("Error updating customer data:", error);
      if (error.response && error.response.data) {
        console.error("Response data:", error.response.data);
        setErrorMessage(`Failed to update customer data: ${error.response.data.Message}`);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
    incrementReceiptCount();
};

  const handleClearForm = () => {
    setShowClearConfirmation(true);
  };

  const handleConfirmClearList = () => {
    setSelectedCustomer('');
    setDueDate('');
    setExpectedDate('');
    setVisaType('Study Visa');
    setTermDays('');
    setBalance('');
    setPaidBy('');
    setPaidTo('');
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
    setPassportNo('');
    setIssueDate('');
    setExpiryDate('');
    setShowClearConfirmation(false);
  };

  const handleCancelClearList = () => {
    setShowClearConfirmation(false);
  };

  const handleGenerateReceipt = () => {
    const input = document.getElementById('receipt'); // Ensure this ID matches an existing element
    if (input) {
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save('receipt.pdf');
        });
    } else {
      console.error('Receipt container not found');
    }
  };

  const handleCustomerSelect = (selectedCustomer) => {
    setSelectedCustomer(selectedCustomer);
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
  <Form.Group controlId="customerSelect">
    <Form.Label
      style={{
        color: 'White',
        fontFamily: 'Arial, sans-serif',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        fontWeight: 'bold',
      }}
    >
      Select Customer
    </Form.Label>
    <ButtonGroup>
      <Button variant="warning">Select Customer</Button>
      <Dropdown as={ButtonGroup} onSelect={handleCustomerSelect}>
        <Dropdown.Toggle split variant="warning" className="custom-split-toggle" />
        <Dropdown.Menu className="custom-dropdown-menu">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              margin: "8px 10px",
              width: "calc(100% - 20px)",
              borderRadius: "5px",
            }}
          />
          {customerData
            .filter((customer) =>
              customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((customer) => (
              <Dropdown.Item key={customer.id} eventKey={customer.customer_name}>
                {customer.customer_name}
              </Dropdown.Item>
            ))}

        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  </Form.Group>
</Col>

          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Paid By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Paid By"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Paid To</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Paid TO"
                value={paidTo}
                onChange={(e) => setPaidTo(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Balance</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>


        {/* <Row>
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
                onChange={(e) => setTermDays(e.target.value)}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
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
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Balance</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Appointment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Appointment"
                value={appointment}
                onChange={(e) => setAppointment(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Consultancy Fee</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Consultancy Fee"
                value={consultancyFee}
                onChange={(e) => setConsultancyFee(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Registration Fee</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Registration Fee"
                value={registrationFee}
                onChange={(e) => setRegistrationFee(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Ticket</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Ticket"
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Hotel Booking</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Hotel Booking"
                value={hotelBooking}
                onChange={(e) => setHotelBooking(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Application Form</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Application Form"
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
                placeholder="Enter Travel Insurance"
                value={travelInsurance}
                onChange={(e) => setTravelInsurance(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col>
          <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Passport no</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter Passport number'
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
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Months remaining</Form.Label>
              <Form.Control
               type="number"
               value={monthsremaining}
               onChange={(e) => setMonthsremaining(e.target.value)}
               disabled
                    style={{ 
                       backgroundColor: monthsremaining <= 9 ? '#F88379' : '', // Red background if 9 or less
                       borderColor: monthsremaining <= 9 ? '#8B0000' : '', // Red border if 9 or less
                      color: monthsremaining <= 9 ? '#721c24' : '' // Dark red text if 9 or less
                            }}
                             />
                          </Form.Group>
          </Col>
       
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ color: 'White', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Documents</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Documents"
                value={documents}
                onChange={(e) => setDocuments(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row> */}

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
            <div>CLIENT NAME: {selectedCustomer}</div>
        <div>PAID BY: {paidBy}</div>
        <div>PAID TO: {paidTo}</div>
        <div>VISA TYPE: {visaType}</div>
        <div>TICKET: {ticket}</div>
            </div>
            <div className="receipt-box">
            <div>RECEIPT NO: {receiptCount}</div>
        <div>CONSULTANCY FEE: {consultancyFee}</div>
        <div>REGISTRATION FEE: {registrationFee}</div>
        <div>HOTEL BOOKING: {hotelBooking}</div>
        <div>APPLICATION FORM: {applicationForm}</div>
        <div>TRAVEL INSURANCE: {travelInsurance}</div>
        <div>APPOINTMENT: {appointment}</div>
            </div>
          </div>
          <div className="receipt-summary">
          <div>SUBTOTAL: {balance}</div>
      <div>DISCOUNT: {discount}</div>
      <div>RECEIVED: {paidAmount}</div>
      <div>REMAINING: {remainingAmount}</div>
      <div>Total: {total}</div>
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
    <Footer/>
    </>
  );
};

export default UpdateCustomerFormEmployee;
