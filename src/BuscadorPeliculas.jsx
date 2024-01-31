import { useState } from "react"

export const BuscadorPeliculas = () => {

    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])  // Asegúrate de inicializar el estado de películas como un array

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '26a9323bf2755fbbf0d17a3d03881b40'

    const handleInputChange = (e) => {
        setBusqueda(e.target.value)
    }

    const handleSubmin = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }

    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json()
            setPeliculas(data.results)  // Modificado para utilizar data.results
        } catch (error) {
            console.error('Ha ocurrido un error: ', error)
        }
    } 

    return (
        <div className="container">
            <h1 className="title">Buscador de películas</h1>
            <form onSubmit={handleSubmin}>
                <input 
                    type="text" 
                    placeholder="Escribir nombre de la película"
                    value={busqueda}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>

            <div className="movie-list">
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={`${pelicula.title}`} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
