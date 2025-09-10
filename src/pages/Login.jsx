import React from 'react'
import heroBg from '../assets/hero_bg.jpg'
import banner from '../assets/banner_netflix.png'
import { useClerk, useUser ,UserButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const handLogin = ()=>{
        if (user){
            navigate('/layout')
        }else{
            openSignIn()
        }
    }
    
    return (
        <section className='relative h-screen w-full bg-center bg-cover bg-no-repeat after:absolute after:content-[""] after:top-0 after:left-0 after:w-full after:z-0 after:h-full after:bg-black/65 ' style={{ backgroundImage: `url(${heroBg})` }} >
            <div className='relative container mx-auto md:px-12 px-4 h-full w-full flex flex-col z-50'>
                <header className='sticky top-0  flex justify-between items-center h-20 w-full '>
                    <div className='w-36 h-28 flex-shrink  '>
                        <img src={banner} alt="" className='w-full h-full object-contain animate-pulse' />
                    </div>
                    <div className='flex items-center gap-4'>
                        <button className='relative text-base overflow-hidden font-semibold bg-transparent border border-red-600 text-white my-font px-6 py-2 rounded-md after:absolute after:content-[""] after:top-0 after:left-0 after:w-0 after:h-full after:bg-red-600 after:-z-10 after:rounded-md hover:after:w-full after:transition-all after:duration-500 ' onClick={handLogin}>Login</button>
                        <div>
                             {user && <UserButton/>}
                        </div>

                    </div>
                </header>
                <div className='flex flex-col flex-1 justify-center items-center gap-7'>
                    <h1 className='text-white text-3xl md:text-5xl font-bold  my-text-shadow'>Unlimited Movies, Series, and Entertainment — Just a Clone of Netflix
                    </h1>
                    <p className='text-white md:text-xl font-mono font-medium'>Watch trailers, explore top picks, and experience a Netflix-inspired interface.
                        This project is a front-end clone built with React to showcase design and development skills.
                    </p>
                </div>
                <footer className='text-center mb-2  '>
                          <p className='text-white my-font sm:text-sm md:text-base'>&copy; All rights reserved | <b className='md:text-sm text-xs cursor-pointer hover:text-red-600 transition-all duration-300'>Chehma Ahmed Nadir</b></p>

                </footer>
            </div>
        </section>
    )
}

export default Home