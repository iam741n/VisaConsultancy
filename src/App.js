import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import AdminDashboard from './Components/AdminDashboard';
import UpdatePasswordEmpolyee from './Components/UpdatePasswordEmpolyee';
import AllCustomers from './Components/AllCustomers';
import AllCustomerByDate from './Components/AllCustomerByDate';
import CreateReminder from './Components/CreateReminder';
import ViewReminder from './Components/ViewReminder';
import AlarmModal from './Components/AlarmModal';
import Expense from './Components/Expense';
function App() {
  return (
    <Router>
 <Routes>
   <Route path="/" element={<Login />} />
   <Route path="/Signup" element={<Signup />} />
   <Route path="/Dashboard" element={<Dashboard />} />
   <Route path="/AdminDashboard" element={<AdminDashboard />} />
   <Route path="/UpdatePasswordEmpolyee" element={<UpdatePasswordEmpolyee />} />
   <Route path="/AllCustomers" element={<AllCustomers />} />
   <Route path="/AllCustomerByDate" element={<AllCustomerByDate />} />
   <Route path="/CreateReminder" element={<CreateReminder />} />
   <Route path="/ViewReminder" element={<ViewReminder />} />
   <Route path="/AlarmModal" element={<AlarmModal />} />
   <Route path="/Expense" element={<Expense />} />
   </Routes>
   </Router>
 
  );
}

export default App;


// import { API_URL } from './config';
// import { ApiContext } from './Context/ApiContext';
