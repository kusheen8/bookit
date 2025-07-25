import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { TeacherContext } from '../context/TeacherContext'

const Sidebar = () => {

    const {aToken}= useContext(AdminContext)
    const {dToken} = useContext(TeacherContext)


  return (
    <div className ='min-h-screen bg-white border-r'>
    {
        aToken && <ul className ='text-[#515151] mt-5'>


          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''} `} to ={'/admin-dashboard'}>
            <img className='w-6 h-6' src={assets.home_icon} alt=""/>
            <p>Dashboard</p>
          </NavLink>

           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''} `} to ={'/all-appointments'}>
            <img className='w-6 h-6' src={assets.appointment_icon} alt=""/>
            <p>Appointments</p>
          </NavLink>

           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''} `} to ={'/all-teacher' }>
            <img className='w-6 h-6' src={assets.add_icon} alt=""/>
            <p>Add Teacher</p>
          </NavLink>

           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''} `} to ={'/teacher-list'}>
            <img className='w-6 h-6' src={assets.people_icon} alt=""/>
            <p>Teacher List</p>
          </NavLink>

        </ul>
    }
     {
        dToken && <ul className ='text-[#515151] mt-5'>


          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''} `} to ={'/teacher-dashboard'}>
            <img  className='w-6 h-6' src={assets.home_icon} alt=""/>
            <p className='hidden md:block '>Dashboard</p>
          </NavLink>

           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''} `} to ={'/teacher-appointments'}>
            <img className='w-6 h-6' src={assets.appointment_icon} alt=""/>
            <p className='hidden md:block '>Appointments</p>
          </NavLink>

           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''} `} to ={'/teacher-profile'}>
            <img className='w-6 h-6' src={assets.people_icon} alt=""/>
            <p className='hidden md:block '>Profile </p>
          </NavLink>

        </ul>
    }
    </div>
  )
}

export default Sidebar
