import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { FaStar } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';



const Search = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q');
  const navigate = useNavigate();
  const [searchReasults, setSearchResults] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`;

  const notify = () => toast('No results found');




  useEffect(() => {
    if (!searchTerm) return;
    const controller = new AbortController();

    const getSearchResults = async () => {
      try {
        const res = await axios.get(movieUrl, { signal: controller.signal });
        const data = res.data.results
        const filtreFilms = data.filter(film => film.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
        setSearchResults(filtreFilms);
        if (filtreFilms.length === 0) {
          notify();
        }
      } catch (error) {
        console.log(error);
        setSearchResults([])
      }
    }
    getSearchResults();
    return () => controller.abort();
  }, [searchTerm])
  return (
    <section className='mt-28 flex flex-col justify-center items-center gap-5'>
      <div>
        <h2 className='text-2xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent '>Search Results</h2>

      </div>
      <div className='flex flex-wrap justify-center items-center gap-2'>
        {searchReasults.map((search) => (
          <div key={search.id} className='h-[300px] w-[288px] flex flex-col justify-center overflow-hidden gap-5 py-3 px-2 cursor-pointer'>
            <div className=' w-full h-full ' >
              <img src={`https://image.tmdb.org/t/p/w500/${search.backdrop_path}`} alt={search.title} className='w-full h-full object-cover rounded-lg' />
            </div>
            <div className=' flex justify-between items-center h-28 '>
              <h3 className='my-title text-sm md:text-base'>{search.title}</h3>
              <div className='flex items-center gap-1'>
                <span className='text-white text-sm'>{search.vote_average.toFixed(1)}</span>
                <FaStar className='text-yellow-400' />
              </div>
            </div>
            <div className='flex justify-between items-center w-full '>
              <button className='relative border border-red-600 text-white my-font px-4 py-2 rounded-md after:absolute after:content-[""] after:top-0 after:left-0 after:w-0 after:h-full after:bg-red-600 after:-z-10 after:rounded-md hover:after:w-full hover:scale-95 after:transition-all after:duration-500' onClick={() => navigate(`/layout/movies/${search.id}`)} >Details</button>
              <button className='relative border border-red-600 text-white my-font px-4 py-2 rounded-md after:absolute after:content-[""] after:top-0 after:left-0 after:w-0 after:h-full after:bg-red-600 after:-z-10 after:rounded-md hover:after:w-full hover:scale-95 after:transition-all after:duration-500' onClick={() => navigate(-1)} >Back</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Search