import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [teachers,setTeachers] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const getAllTeachers = async () => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/admin/all-teachers', // ✅ Add '/' just in case
      {},
      {
        headers: {
          Authorization: `Bearer ${aToken}`, // ✅ Use standard Authorization header
        },
      }
    );

    if (data.success) {
      setTeachers(data.teachers);
      console.log(data.teachers);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

const changeAvailability = async (teacherid) => {
    try {
       
          const {data} = await axios.post(backendUrl + '/api/admin/change-availability',{teacherid}, {headers: {Authorization: `Bearer ${aToken}`, },})
          if (data.success){
            toast.success(data.message)
            getAllTeachers()
          }else{
            toast.error(data.message)
          }

    }catch(error){
        toast.error(error.message)
    }
}

const getAllAppointments = async () => {

  try {
    

    const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers: {Authorization: `Bearer ${aToken}`, },})


    if (data.success) {
      setAppointments(data.appointments)
      console.log(data.appointments)
    } else{
      toast.error(data.message)
    }

  } catch (error) {
    
  }
}

const cancelAppointment = async (appointmentId) =>{
  try {
    
    const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId}, {headers: {Authorization: `Bearer ${aToken}`, },})
    if (data.success) {
      toast.success(data.message)
      getAllAppointments()
    } else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

const getDashData = async () =>{
  try {
    const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers: {Authorization: `Bearer ${aToken}`, },})
    if(data.success){
      setDashData(data.dashData)
      console.log(data.dashData);
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
    
  }
}

    const value={
        aToken,setAToken,
        backendUrl,teachers,
        getAllTeachers,changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData
    }

    return (
        <AdminContext.Provider value ={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider