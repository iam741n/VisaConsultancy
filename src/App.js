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
import ManageEmpolyees from './Components/ManageEmployees';
import UpdatePasswordAdmin from './Components/UpdatePasswordAdmin';
import ViewReminderEmpolyee from './Components/ViewRemindersEmpolyee';
import CreateReminderEmployee from './Components/CreateReminderEmployee';
import UpdateCustomerForm from './Components/UpdateCustomerForm';
import ProfitLossChart from './Components/ProfitLossChart';
import DailyProgressChart from './Components/DailyProgressChart';
import ViewExpense from './Components/ViewExpense';
import DailyExpense from './Components/DailyExpense';
import AllExpense from './Components/AllExpense';
import UpdateCustomerFormEmployee from './Components/UpdateCustomerFormEmployee';
import EmpolyeeHome from './Components/EmployeeHome';
import Dashboard2 from './Components/Dashboard2';
import AdminHome from './Components/AdminHome';
import AdminDashboard2 from './Components/AdminDashboard2';
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
   <Route path="/ManageEmpolyees" element={<ManageEmpolyees />} />
   <Route path="/UpdatePasswordAdmin" element={<UpdatePasswordAdmin />} />
   <Route path="/ViewReminderEmpolyee" element={<ViewReminderEmpolyee />} />
   <Route path="/CreateReminderEmployee" element={<CreateReminderEmployee />} />
   <Route path="/UpdateCustomerForm" element={<UpdateCustomerForm/>} />
   <Route path="/ProfitLossChart" element={<ProfitLossChart/>} />
   <Route path="/DailyProgressChart" element={<DailyProgressChart/>} />
   <Route path="/ViewExpense" element={<ViewExpense/>} />
   <Route path="/DailyExpense" element={<DailyExpense/>} />
   <Route path="/AllExpense" element={<AllExpense/>} />
   <Route path="/UpdateCustomerFormEmployee" element={<UpdateCustomerFormEmployee/>} />
   <Route path="/EmpolyeeHome" element={<EmpolyeeHome/>} />
   <Route path="/Dashboard2" element={<Dashboard2/>} />
   <Route path="/AdminHome" element={<AdminHome/>} />
   <Route path="/AdminDashboard2" element={<AdminDashboard2/>} />
   

   
   </Routes>
   </Router>
 
  );
}

export default App;


// import { API_URL } from './config';
// import { ApiContext } from './Context/ApiContext';
