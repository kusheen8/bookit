import React from 'react'
import { assets } from '../assets/assests'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-20 flex flex-col md:flex-row'>
        <img className='w-full md:max-w-[480px] md:mr-8' src={assets.about} alt="" />
        <div className='flex flex-col justify-center gap-3 md:w-2/4 text-md text-gray-600'>
          <p>Welcome to BookIt! We’re so glad you’re here. This isn’t just another app—it’s a place where meaningful connections are made between students and teachers. Whether you’re looking for guidance or eager to share your knowledge, we’re here to make every step easy and stress-free. Together, let’s create learning experiences that truly make a difference. Thank you for trusting us to be a part of your journey!</p>
          <p>BookIt is all about creating a space where learning feels simple and natural. We help students and teachers connect in a way that saves time and energy, so they can focus on what really matters—education. With BookIt, scheduling lessons is no longer a hassle; it’s effortless and straightforward. We believe that every lesson has the power to shape someone’s future, and we’re here to make it happen.</p>
          <b className='text-gray-800'>OUR MISSION</b>
          <p>At BookIt, we’re on a heartfelt mission to make education truly accessible, personal, and impactful for everyone. We envision a world where students and teachers can connect effortlessly, free from the hassles of scheduling or logistics. BookIt is more than just a tool—it’s a bridge that fosters trust, growth, and collaboration between learners and educators. By simplifying the booking process, we empower students to focus on their growth and give teachers the freedom to share their knowledge with ease. Our goal is to transform education into a seamless and enriching experience, one connection at a time. Together, we’re shaping a future where learning knows no bounds and every opportunity is meaningful.</p>
        </div>
      </div>
      <div className='text-xl my-10'>
        <p>WHY <span className='text-gray-700 font-bold'>CHOOSE US</span> </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20 '>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convienience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
      
    </div>
  )
}

export default About
