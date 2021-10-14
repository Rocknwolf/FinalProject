import React, {useEffect, useState} from 'react'
import topTen from '../images/top10.jpg';

import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';

function TopTenCards() {
    const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=03ea09ec53921e5dfaf14ebd92c56d08&language=de-DE&page=1";
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        fetch(FEATURED_API)
        .then(res => res.json())
        .then(data=>{
            setMovies(data.results);
        });
    }, []);   
      
    return (
        <div>
            <div className="mainCard">
                <Card className="card">
                    <CardImg className="cardImg" src={topTen} alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h3">Blockbuster</CardTitle>
                        <CardText>Ein kleiner Auszug aus unserer Datenbank</CardText>
                        <div>
                        {
                            movies.length > 0 && 
                            movies.slice(0, 10).map((movie) =>
                                <div key={movie.title}>
                                    <a href={"http://localhost:3000/movies" + movie.backdrop_path}> {movie.title} </a>
                                </div>
                            )
                        } 
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default TopTenCards
