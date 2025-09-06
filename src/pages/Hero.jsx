import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const Hero = () => {
  const { movies } = useContext(MovieContext);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <section className='mt-48 md:mt-28 text-white flex flex-col justify-center items-center gap-5 z-0  ' >
      <div className='flex flex-col justify-center items-center gap-2'>
        <h2 className='text-2xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent'>Welcome to the Movie App</h2>
        <p className='text-xs md:text-lg font-mono font-mediu text-gray-300'>Discover the latest movies and TV shows</p>
      </div>
       <Carousel autoPlay infinite={true} responsive={responsive} containerClass=' mt-2 w-full flex jusctify-center items-center z-0'
    itemClass="flex justify-center px-2">
         {movies.map((movie) => (
          <div key={movie.id} className='rounded-md overflow-hidden h-full w-52'>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='w-full h-full object-cover rounded-md' />
          </div>
        ))}
      </Carousel>
    </section>
  )
}

export default Hero