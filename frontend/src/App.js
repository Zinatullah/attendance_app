import SpecificUserAttendance from './components/users/superadmin/attendance/SpecificUserAttendance'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
// import Sign from './components/signUp/Sign'
import { ToastContainer } from "react-toastify";

// Super admin section  //
import Header from './components/users/superadmin/Header'
// import SpecificUser from './components/users/superadmin/SpecificUser'
import UserRegister from './components/users/superadmin/registeration/UserRegister'
import UpdateUser from './components/users/superadmin/registeration/UpdateUser'
import Users from './components/users/superadmin/Users'
// import Devices from './components/users/superadmin/attendance/Devices'

// Admin section  //
import AdminUserRegister from './components/users/admin/registeration/AdminUserRegister'
import AdminSpecificUser from './components/users/admin/AdminSpecificUser'
import AdminDashboard from './components/users/admin/AdminDashboard'
import AdminUsers from './components/users/admin/AdminUsers'
import AdminSpecificUserAttendance from './components/users/admin/attendance/AdminSpecificUserAttendance'
import AdminDevices from './components/users/admin/attendance/AdminDevices'

// Viewer section  //
import ViewerDashboard from './components/users/viewer/ViewerDashboard'
import ViewUser from './components/users/viewer/ViewUser'
// import ViewerSpecificUser from './components/users/viewer/ViewerSpecificUser'
// import ViewerSpecificUserAttendance from './components/users/viewer/attendance/ViewerSpecificUserAttendancese'
import ViewerDevices from './components/users/viewer/attendance/ViewerDevices'

// 
// import Dashboard from './components/dashboard/Dashboard'
// import Attendance from "./components/attendance/Attendance";

// 
import Dashboard from './components/users/_system_users/_super_admin/Dashboard'

/////////////////////////////////////////////////////////////////////////////////////////////////////////
import Signup_page from './components/users/_system_users/_super_admin/pages/Signup_page';
import All_users_page from './components/users/_system_users/_super_admin/pages/All_users_page';
import NewEmployee from './components/users/_system_users/_super_admin/pages/NewEmployee'
import AllEmployees from './components/users/_system_users/_super_admin/pages/AllEmployees'
import SpecificUser from './components/users/_system_users/_super_admin/pages/SpecificUser'
import GeneralLeaveCheck from './components/users/_system_users/_super_admin/pages/GeneralLeaveCheck'
import Devices from './components/users/_system_users/_super_admin/pages/Devices'
import MonthlyReport from './components/users/_system_users/_super_admin/pages/MonthlyReport'
import DailyReport from './components/users/_system_users/_super_admin/pages/DailyReport'
import AllEmployeesLeaveForm from './components/users/_system_users/_super_admin/pages/All_employees_leave_form';

function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element= {<Dashboard />} />
          {/* <Route path='/users' element= {<Users />} /> */}
          <Route path='/users' element= {<AllEmployees />} />
          <Route path='/user/:id' element= {<SpecificUser />} />
          {/* <Route path="/userRegister" element={<UserRegister />} /> */}
          <Route path="/userRegister" element={<Signup_page />} />
          {/* <Route path="/updateuser" element={<UpdateUser />} /> */}
          <Route path="/updateuser" element={<All_users_page />} />
          <Route path="/newemployee" element={<NewEmployee />} />
          {/* <Route path='/specificuserattendance/:id' element= {<SpecificUserAttendance />} /> */}
          <Route path='/SpecificUser/:id' element= {<SpecificUser />} />
          <Route path='/generalLeaveCheck' element= {<GeneralLeaveCheck />} />
          <Route path='/Leaveform' element= {<AllEmployeesLeaveForm />} />

          <Route path='/devices' element= {<Devices />} />
          <Route path='/monthlyreport' element= {<MonthlyReport/>} />
          <Route path='/dailyreport' element= {<DailyReport/>} />
          
          <Route path='/adminDashboard' element= {<AdminDashboard />} />
          <Route path='/AdminSpecificUser/:id' element= {<AdminSpecificUser />} />
          <Route path='/adminusers' element= {<AdminUsers />} />
          <Route path="/adminuserregister" element={<AdminUserRegister />} />
          <Route path='/adminspecificuserattendance/:id' element= {<AdminSpecificUserAttendance />} />
          <Route path='/admindevices' element= {<AdminDevices />} />

          {/* <Route path='/viewerDashboard' element= {<ViewerDashboard />} /> */}
          {/* <Route path='/viewerDashboard' element= {<Dashboard />} /> */}
          {/* <Route path='/SpecificUser/:id' element= {<SpecificUser />} /> */}
          <Route path='/viewusers' element= {<ViewUser />} />
          {/* <Route path='/ViewerSpecificUserAttendance/:id' element= {<ViewerSpecificUserAttendance />} /> */}
          <Route path='/viewerdevices' element= {<ViewerDevices />} />
          
          {/* <Route path="/register" element={<SignUp />} /> */}
          <Route path="/login" element={<SignIn />} />

        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
