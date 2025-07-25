import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import { Route, Routes } from 'react-router-dom';
import AllAppointments from './pages/Admin/AllAppointments';
import AddTeacher from './pages/Admin/AddTeacher';
import TeachersList from './pages/Admin/TeachersList';
import { TeacherContext } from './context/TeacherContext';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import TeacherAppointments from './pages/Teacher/TeacherAppointments';
import TeacherProfile from './pages/Teacher/TeacherProfile';

const App = () => {

 const {aToken} = useContext (AdminContext)
 const {dToken} = useContext (TeacherContext)



  return aToken || dToken  ? (
    <div className='bg-[#ffffff]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path = '/' element={<></>} />
          <Route path = '/admin-dashboard' element={<Dashboard/>} />
          <Route path = '/all-appointments' element={<AllAppointments/>} />
          <Route path = '/all-teacher' element={<AddTeacher/>} />
          <Route path = '/teacher-list' element={<TeachersList/>} />

          {/* Teacher Route */}
          <Route path='/teacher-dashboard' element={<TeacherDashboard/>} />
          <Route path='/teacher-appointments' element={<TeacherAppointments/>} />
          <Route path='/teacher-profile' element={<TeacherProfile/>} />
        </Routes>
      </div>
    </div>
  ):(
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
