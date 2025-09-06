import { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const MovieContext = createContext();
 const MovieContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const controller  = new AbortController();

    const API_KEY = import.meta.env.VITE_API_KEY;
    const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
    const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    const upcomingMovieUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;


    const getMovies = async () => {
        try {
            const res = await axios.get(movieUrl ,{signal:controller.signal});
            const data = res.data.results
            setMovies(data);
        } catch (error) {
            console.log(error);
        }
    }
    const getPopularMovies = async () => {
        try {
            const res = await axios.get(popularMovieUrl ,{signal:controller.signal});
            const data = res.data.results
            setPopularMovies(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getUpcomingMovies = async () => {
        try {
            const res = await axios.get(upcomingMovieUrl ,{signal:controller.signal});
            const data = res.data.results
            setUpcomingMovies(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getMovies()
        getPopularMovies()
        getUpcomingMovies()  
        return () => {
            controller.abort();
        }
    }, [])


    return (
        <MovieContext.Provider value={{ movies, popularMovies ,upcomingMovies }}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieContextProvider