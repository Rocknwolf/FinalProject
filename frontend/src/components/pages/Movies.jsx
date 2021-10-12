import React, {useEffect, useState} from 'react'

import Movie from '../Movie.jsx';
import './movies.css';

    const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=03ea09ec53921e5dfaf14ebd92c56d08&language=de-DE&page=1";

    const IMG_API = "https://image.tmdb.org/t/p/w1280";

    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=03ea09ec53921e5dfaf14ebd92c56d08&language=de-DE&query=`;

function Movies() {
    const [ movies, setMovies ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState("");

    useEffect(() => {
        getMovies(FEATURED_API);
    }, []);

    const getMovies = (API) => {
        fetch(API)
        .then(res => res.json())
        .then(data=>{
            console.log(data);
            setMovies(data.results);
        });
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        
        if(searchTerm) {
            getMovies(SEARCH_API + searchTerm);
            setSearchTerm('');
        }
    };

    const handleOnChange = (e) =>{
        setSearchTerm(e.target.value);
    }

    return (
        <div className="root">
            <header>
                <form onSubmit={handleOnSubmit}>
                    <input className="search" type="search" placeholder="Search..." value={searchTerm} onChange={handleOnChange} />
                </form>
            </header>
            <div className="movieContainer">
                {movies.length > 0 &&
                    movies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
        </div>
    )
}

export default Movies
