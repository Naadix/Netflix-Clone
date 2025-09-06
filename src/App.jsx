import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import Login from './pages/Login'
import Hero from './pages/Hero'
import Upcoming from './pages/Upcoming'
import Search from './pages/Search'
import MobileSearch from './pages/MobileSearch'
import { Toaster } from 'react-hot-toast'
import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import WatchList from './pages/WatchList'


const App = () => {
  const { user } = useUser();

const router = createBrowserRouter([
  {
    path: '/',
    element: user ? <Navigate to="/layout" /> : <Login />
  },
  {
    path: '/login',
    element: user ? <Navigate to="/layout" /> : <Login />
  },
  {
    path: '/layout',
    element: user ? <Layout /> : <Navigate to="/login" />,
    children: [
      {
        path: '',
        element: <Hero />
      },
      {
        path: 'movies',
        element: <Movies />
      },
      {
        path: 'movies/:id',
        element: <MovieDetails />
      },
      {
        path: 'upcoming',
        element: <Upcoming />
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'mobilesearch',
        element: <MobileSearch />
      },
      {
        path:'watchlist',
        element : <WatchList/>
      }

    ]
  }
])
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} toastOptions={{
        style: {
          background: '#363636',
          color: '#f44336',
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'Josefin Sans',
          borderRadius: '8px',
        }
      }} />
      <RouterProvider router={router} />
    </>
  )
}

export default App