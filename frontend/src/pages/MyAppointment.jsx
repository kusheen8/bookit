import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MyAppointment = () => {
  const { backendUrl, token, getTeachersData, slotDateFormat } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
      getTeachersData()
    }
  }, [token])

  // ✅ Now returning JSX properly
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => {
          return (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-yellow-50' src={item.teacherData?.image} alt="Teacher" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-natural-800 font-semibold'>{item.teacherData?.name}</p>
                <p className='text-natural-800 font-semibold'>{item.teacherData?.speciality}</p>
                <p className='text-natural-800 font-semibold'>{item.teacherData?.degree}</p>
                <p className='text-natural-800 font-semibold'>{item.teacherData?.experience}</p>
                <p className='text-xs mt-1'>
                  <span className='text-sm text-natural-700 font-medium'>Date & Time:</span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className='flex flex-col gap-2 justify-center'>
  {(!item.cancelled && !item.isCompleted) && (
    <button
      onClick={() => cancelAppointment(item._id)}
      className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
    >
      Cancel Appointment
    </button>
  )}
  {item.cancelled && (
    <p className='sm:min-w-48 py-2 text-center text-red-500 font-semibold'>
      Appointment Cancelled
    </p>
  )}
  {item.isCompleted && (
    <p className='sm:min-w-48 py-2 text-center text-green-500 font-semibold'>
      Completed
    </p>
  )}
</div>

            </div>
      );
        })}
    </div>
    </div >
  )
}

export default MyAppointment
