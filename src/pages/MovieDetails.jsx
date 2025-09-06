import React from 'react'
import { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'
import { FaStar } from "react-icons/fa6";
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const MovieDetails = () => {
  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const [movieDetail, setMovieDetail] = useState(null);
  const controller = new AbortController();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const res = await axios.get(movieDetailUrl, { signal: controller.signal });
        const data = res.data;
        setMovieDetail(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieDetail();
  }, [movieDetailUrl]);

  return (
    <section className='mt-28 grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='h-[400px] w-full rounded-lg'>
        <img src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`} alt="" className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='flex flex-col items-start w-full gap-5'>
        <div className='flex flex-col divide-y divide-gray-700 w-full items-start gap-5'>
           <div className='flex flex-col gap-2 '>
          <h2 className='my-title font-bold text-base md:text-3xl '>{movieDetail?.title}</h2>
          <p className='text-gray-200 font-medium text-sm md:text-base font-mono'>{movieDetail?.overview}</p>
        </div>
        <div className='flex justify-between items-center w-full pt-3 '>
          <div className='flex items-center gap-2'>
            <h4 className='text-white font-medium'>Vote Count</h4>
            <span className='text-gray-500 font-mono '> {movieDetail?.vote_count}</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-white  font-mono '>{movieDetail?.vote_average.toFixed(1)}</span>
            <FaStar className='text-yellow-400' />
          </div>
        </div>
        <div className='flex justify-between items-center w-full pt-3'>
          <div className='flex items-center gap-2'>
            <h4 className='text-white font-medium'>Duration</h4>
            <span className='text-gray-500 font-mono'>{movieDetail?.runtime} min</span>
          </div>
          <div className='flex items-center gap-2'>
            <h4 className='text-white font-medium'>Release Date</h4>
            <span className='text-gray-500 font-mono'>{movieDetail?.release_date}</span>
          </div>
        </div>
        </div>
        <div>
          <button className='relative border my-font border-red-600 text-white my-font px-4 py-2 rounded-md after:absolute after:content-[""] after:top-0 after:left-0 after:w-0 after:h-full after:bg-red-600 after:-z-10 after:rounded-md hover:after:w-full hover:scale-95 after:transition-all after:duration-500 ' onClick={()=> navigate(-1)}>Back</button>
        </div>
      </div>
    </section>
  )
}

export default MovieDetails