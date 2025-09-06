import React, { createContext, useContext, useEffect, useState } from 'react'

const WatchlistContext = createContext();
export const WatchlistProvider = ({children}) => {
    const [watchlistResult, setWatchlistResult] = useState(()=>{
        const storedWatchlist = localStorage.getItem('watchlist');
        return storedWatchlist ? JSON.parse(storedWatchlist) : [];
    });
    useEffect(()=>{localStorage.setItem('watchlist',JSON.stringify(watchlistResult))},[watchlistResult]);
    const AddToWatchlist = (movie)=>{
        setWatchlistResult((prev)=> prev.find((mv)=>mv===movie) ? prev : [...prev,movie]);
    }
    const RemoveToWatchlist = (movie)=>{
        setWatchlistResult(watchlistResult.filter((mv)=>mv!==movie));
    }
  return (
   <WatchlistContext.Provider value={{watchlistResult,AddToWatchlist,RemoveToWatchlist}}>
    {children}
   </WatchlistContext.Provider>
  )
}

export default WatchlistContext