import React from 'react'
import { specialityData } from '../assets/assests'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
      <div className= 'flex flex-col items-center gap-4 py-16 text-gray-800' id= 'speciality'>
        <h1 className ='text-3xl font-medium'>Find by Specilization</h1>
        <p className ='sm:w-1/3 text-center text-sm'> You can scroll through the site and book your appointment </p>
      <div className ='flex sm:justify-center gap-6 pt-5 w-full overflow-scroll'>
        {specialityData.map((item,index)=>(
            <Link onClick ={()=> window.scrollTo(0,0)} className = 'flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to ={`/teachers/${item.speciality}`}>
                <img className ='w-16 sm:w-24 mb-2'src={item.image} alt='' />
                <p>{item.speciality}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
