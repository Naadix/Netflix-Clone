import React from 'react'
import { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'
import { FaStar } from "react-icons/fa6";
import {  useNavigate } from 'react-router-dom';
import  WatchlistContext  from '../context/WatchlistContext';
import { toast } from 'react-hot-toast';
const Upcoming = () => {
  const navigate = useNavigate();
    const {upcomingMovies} = useContext(MovieContext);
      const {AddToWatchlist} = useContext(WatchlistContext);
        const notify1 = ()=> toast('Added to Watchlist');
  const handleWatchlist = (movie) =>{
   const film = movie;
    notify1() && AddToWatchlist(film) ;
  }

  return (
    <section className='mt-28 flex flex-col justify-center items-center gap-5'>
      <div>
        <h2 className='text-2xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent '>Upcoming Movies</h2>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2'>
        {upcomingMovies.slice(0,12).map((movie)=>(
          <div key={movie.id} className='w-[288px] h-[300px] flex flex-col justify-center gap-5 py-3 px-2 cursor-pointer'>
            <div className=' w-full h-full ' >
              <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" className='w-full h-full object-cover rounded-lg' />
            </div>
            <div className='flex justify-between items-center'>
              <h3 className='my-title text-sm md:text-base'>{movie.title}</h3>
              <div className='flex items-center gap-1'>
                <span className='text-white text-sm'>{movie.vote_average.toFixed(1)}</span>
                <FaStar className='text-yellow-400' />
              </div>
            </div>
               <div className='flex justify-between items-center'>
              <button className ='relative text-sm border border-red-600 text-white my-font px-4 py-2 rounded-md after:absolute after:content-[""] after:top-0 after:left-0 after:w-0 after:h-full after:bg-red-600 after:-z-10 after:rounded-md hover:after:w-full hover:scale-95 after:transition-all after:duration-500' onClick={()=>navigate(`/layout/movies/${movie.id}`)}>Details</button>
              <button className ='relative  text-sm border border-red-600 text-white my-font px-4 py-2 rounded-md after:absolute after:content-[""] after:top-0 after:left-0 after:w-0 after:h-full after:bg-red-600 after:-z-10 after:rounded-md hover:after:w-full hover:scale-95 after:transition-all after:duration-500' onClick={()=>{handleWatchlist(movie)}}>Add To Watchlist </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Upcoming