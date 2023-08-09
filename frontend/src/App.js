import SpecificUserAttendance from './components/users/superadmin/attendance/SpecificUserAttendance'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
// import Sign from './components/signUp/Sign'
import { ToastContainer } from "react-toastify";

// Super admin section  //
import Header from './components/users/superadmin/Header'
import SpecificUser from './components/users/superadmin/SpecificUser'
import UserRegister from './components/users/superadmin/registeration/UserRegister'
import UpdateUser from './components/users/superadmin/registeration/UpdateUser'
import Users from './components/users/superadmin/Users'
import Devices from './components/users/superadmin/attendance/Devices'

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
import ViewerSpecificUserAttendance from './components/users/viewer/attendance/ViewerSpecificUserAttendance'
import ViewerDevices from './components/users/viewer/attendance/ViewerDevices'

// 
// import Dashboard from './components/dashboard/Dashboard'
// import Attendance from "./components/attendance/Attendance";

function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element= {<Header />} />
          <Route path='/users' element= {<Users />} />
          <Route path='/user/:id' element= {<SpecificUser />} />
          <Route path="/userRegister" element={<UserRegister />} />
          <Route path="/updateuser" element={<UpdateUser />} />
          <Route path='/specificuserattendance/:id' element= {<SpecificUserAttendance />} />
          <Route path='/devices' element= {<Devices />} />
          
          <Route path='/adminDashboard' element= {<AdminDashboard />} />
          <Route path='/AdminSpecificUser/:id' element= {<AdminSpecificUser />} />
          <Route path='/adminusers' element= {<AdminUsers />} />
          <Route path="/adminuserregister" element={<AdminUserRegister />} />
          <Route path='/adminspecificuserattendance/:id' element= {<AdminSpecificUserAttendance />} />
          <Route path='/admindevices' element= {<AdminDevices />} />

          <Route path='/viewerDashboard' element= {<ViewerDashboard />} />
          <Route path='/SpecificUser/:id' element= {<SpecificUser />} />
          <Route path='/viewusers' element= {<ViewUser />} />
          <Route path='/ViewerSpecificUserAttendance/:id' element= {<ViewerSpecificUserAttendance />} />
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
