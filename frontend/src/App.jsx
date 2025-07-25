import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/teachers' element={<Teachers />} />
        <Route path='/teachers/:speciality' element={<Teachers />} />
        <Route path='/teachers/:speciality/appointment/:teacherid' element={<Appointment />} />
        <Route path='/appointment/:teacherid' element={<Appointment />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
