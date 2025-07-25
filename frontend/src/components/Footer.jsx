import React from 'react'
import { assets } from '../assets/assests'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/*-----Left Part-----*/}
        <div>
        <img className ='mb-5 w-40' src={assets.logo} alt=''/>
        <p className='w-full md:w-2/3 text-gray-600 leading-6'>It is an intuitive app that enables seamless scheduling, resource management, and communication between teachers and students to simplify academic coordination.</p>
        </div>

        {/*----Center Part-----*/}
        <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className ='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        {/*-----Right Part-----*/}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className ='flex flex-col gap-2 text-gray-600'>
            <li>+91 98765 43210</li>
            <li>contact@bookitapp.com</li>
          </ul>  
        </div>
      </div>
      <div>
        {/*-------Copright */}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>© [Year] BookIt. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
