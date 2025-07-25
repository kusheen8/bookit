import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [teachers,setTeachers] = useState([])

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData,setUserData] = useState(null)


    const getTeachersData = async () =>{
        try {
            
            const {data} = await axios.get(backendUrl + '/api/teacher/list')
                if(data.success){
                    setTeachers(data.teachers)
                }else{
                    toast.error(data.message)
                }
            

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const slotDateFormat = (slotDate) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (!slotDate) return 'Invalid Date';
        const dateArray = slotDate.split('_');
        if (dateArray.length !== 3) return 'Invalid Date';
    
        const day = dateArray[0];
        const monthIndex = Number(dateArray[1]) - 1;
        const year = dateArray[2];
    
        if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return 'Invalid Date';
    
        return `${day} ${months[monthIndex]} ${year}`;
      };

      
     const loadUserProfileData = async () => {
  try {
    const res = await axios.get(`${backendUrl}/api/user/get-profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      setUserData(res.data.userData); // ✅ should contain address object
    } else {
      toast.error('Failed to load profile data');
    }
  } catch (err) {
    console.error('Profile fetch error:', err);
    toast.error('Error loading profile');
    setUserData(null); // optional: reset if failed
  }
};


    
    const value = {
        teachers,getTeachersData,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData,
        slotDateFormat
    }

    useEffect(()=>{
        getTeachersData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(null)
        }

    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider

