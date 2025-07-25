import React, { useState, useContext } from 'react';
import { assets } from '../assets/assests';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-yellow-400'>
      <img onClick={() => navigate('/')} className='w-20 cursor-pointer' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'><li className='py-1'>HOME</li></NavLink>
        <NavLink to='/Teachers'><li className='py-1'>ALL TEACHERS</li></NavLink>
        <NavLink to='/About'><li className='py-1'>ABOUT</li></NavLink>
        <NavLink to='/Contact'><li className='py-1'>CONTACT</li></NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img
              className='w-12 h-12 object-cover rounded-full hover:scale-105 transition'
              src={userData?.image || assets.profile}
              alt='Profile'
            />
            <img className='w-2.5' src={assets.dropdown} alt='' />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('my-appointment')} className='hover:text-black cursor-pointer'>My Appointment</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            CREATE ACCOUNT
          </button>
        )}
        
        <img onClick={() => setShowMenu(true)} className='w-10 h-15 md:hidden' src={assets.menu} alt="" />

        {/* Mobile Menu */}
        <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-15 h-10' src={assets.logo} alt="" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/teachers'><p className='px-4 py-2 rounded inline-block'>ALL Teachers</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
