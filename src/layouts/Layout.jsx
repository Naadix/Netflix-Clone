import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
     <div className='flex flex-col min-h-screen bg-black/95 overflow-x-hidden'>
      <Navbar />
      <main className=' flex-1 container mx-auto px-4 md:px-12 '>
          <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout