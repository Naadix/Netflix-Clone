import React from 'react'
import logo from '../assets/banner_netflix.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { useState } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { MdOutlineFavorite } from "react-icons/md";


const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const navLinks = [
    {
      path: '/layout',
      name: 'Home'
    },
    {
      path: '/layout/movies',
      name: 'Movies'
    },
    {
      path: '/layout/upcoming',
      name: 'Upcoming'
    },
  ];

  const handleSearch = (e) => {
    if (e.target.value.trim() !== '' && e.key === 'Enter') {
      navigate(`/layout/search?q=${search}`)
      setSearch('')
    }
  }
  return (
    <header className='fixed top-0 z-10 h-20 w-screen bg-black backdrop-blur-lg shadow-md '>
      <div className='w-full h-full container mx-auto md:px-6 px-4 flex justify-between items-center'>
        <div className='w-36 h-28 flex-shrink'>
          <img src={logo} alt="" className='w-full h-full object-contain '/>
        </div>
        {/* menu desktop */}
        <div className='hidden md:flex items-center gap-4'>
          <nav className=' flex justify-center items-center my-font gap-5'>
            {navLinks.map((link, index) => (
              <NavLink end to={link.path} key={index} className={({ isActive }) => `my-font font-semibold relative  hover:text-red-600 hover:font-bold hover:scale-95 after:absolute after:content-[""] after:w-0 after:h-0.5 after:bg-red-600 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'text-red-600 pb-1 ' : 'text-white'}`}>
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div >
            <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => handleSearch(e)} className='ml-3 font-mono border border-red-500 bg-transparent rounded-lg text-white px-3 text-sm font-medium cursor-pointer py-1 outline-none focus:ring-2 focus: ring-red-600  w-1/2 focus:w-full focus:transition-all focus:duration-500' />
          </div>
          <div className='ml-3'>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label='Watchlist' labelIcon={<MdOutlineFavorite />} onClick={()=>navigate('/layout/watchlist')} />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </div>
        {/* menu mobile */}
        <div className='md:hidden flex items-center gap-5'>
          <div>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label='Watchlist' labelIcon={<MdOutlineFavorite />} onClick={()=>navigate('/layout/watchlist')} />
              </UserButton.MenuItems>
            </UserButton>          </div>
          <div>
            <FaSearch className=' text-white text-2xl cursor-pointer hover:text-red-600 transition-all duration-300' onClick={() => navigate('/layout/mobilesearch')} />
          </div>

          <div className=' relative md:hidden w-9 h-9 flex justify-center items-center '>
            {!isOpen && (
              <HiBars3BottomRight className='absolute text-white  top-0 left-0 text-4xl cursor-pointer hover:text-red-600 transition-all duration-300' onClick={() => setIsOpen(!isOpen)} />
            )}
            {isOpen && (
              <IoIosClose className='absolute z-50 text-white text-4xl  top-0 left-0 cursor-pointer  hover:text-red-600 transition-all duration-300' onClick={() => setIsOpen(!isOpen)} />
            )}
          </div>
          <nav className={`md:hidden z-30 absolute top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center gap-5 transition-all duration-700 ease-in-out ${isOpen ? 'translate-x-0 ' : '-translate-x-full'}`}>
            {navLinks.map((link, index) => (
              <NavLink end to={link.path} key={index} className={({ isActive }) => `my-font  font-semibold relative  hover:text-red-600 hover:font-bold hover:scale-95 after:absolute after:content-[""] after:w-0 after:h-0.5 after:bg-red-600 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'text-red-600 pb-1 ' : 'text-white'}`} onClick={() => setIsOpen(false)}>
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

    </header>
  )
}

export default Navbar