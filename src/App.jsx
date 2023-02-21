import { useState } from 'react'
import SearchIcon from './assets/search.svg'
import './App.css'
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com/?apikey=[YOUR_API]'

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const searchMovie = async (title) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}&s=${title}`)
      const data = await response.json()
      setLoading(false)
      setMovies(data.Search)

      if (data.Response === 'False') {
        console.log(`Your error: ${data.Error}`)
      }
    } catch(error) {
      console.log(`Your error: ${error.message}`)
    }
  }

  return (
    <div className='app'>
      <h1>Movie App</h1>

      <div className='search'>
        <input type="text" value={search} placeholder='Search for movies' onChange={(event) => setSearch(event.target.value)} />
        <img src={SearchIcon} alt='Search' onClick={() => searchMovie(search)} />
      </div>

      {loading ? (
        <div className='empty'>
          <h2>Loading...</h2>
        </div>
      ) : movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movie found</h2>
        </div>
      )}
    </div>
  )
}

export default App
