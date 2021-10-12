import React, {useEffect, useState} from 'react'
import topTen from '../images/top10.jpg';

import { Card, Button, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';


function TopTenCards() {
    const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=03ea09ec53921e5dfaf14ebd92c56d08&language=de-DE&page=1";
    
    return (
        <div>
            <div className="mainCard">
                <Card className="card1">
                    <CardImg className="cardImg" src={topTen} alt="Card image cap" />
                    <CardBody>
                    <CardTitle tag="h3">newest</CardTitle>
                    <CardText>Die neusten Blockbuster</CardText>
                    <CardText>
                        <ol>
                            <li><a href="www" >kkk</a></li>
                            <li><a href="www" >Blockbuster</a></li>
                            <li><a href="www" >Blockbuster</a></li>
                            <li><a href="www" >Blockbuster</a></li>
                            <li><a href="www" >Blockbuster</a></li>
                            <li><a href="www" >Blockbuster</a></li>
                            <li><a href="www" >Blockbuster</a></li>
                            <li><a href="www" >Blockbuster</a></li>
                            <li><a href="www" >Blockbuster</a></li>
                            <li><a href="www" >Blockbuster</a></li>
                        </ol>
                    </CardText>
                    </CardBody>
                    <Button color="secondary" className="cardButton" >Button</Button>
                </Card>
            </div>
            <div className="mainCard">
                <Card className="card2">
                        <CardImg className="cardImg" src={topTen} alt="Card image cap" />
                        <CardBody>
                        <CardTitle tag="h3">best rated</CardTitle>
                        <CardText>Best of community</CardText>
                        <CardText>
                            <ol>
                                <li><a href="www" >Blockbuster</a></li>
                                <li><a href="www" >Blockbuster</a></li>
                                <li><a href="www" >Blockbuster</a></li>
                                <li><a href="www" >Blockbuster</a></li>
                                <li><a href="www" >Blockbuster</a></li>
                                <li><a href="www" >Blockbuster</a></li>
                                <li><a href="www" >Blockbuster</a></li>
                                <li><a href="www" >Blockbuster</a></li>
                                <li><a href="www" >Blockbuster</a></li>
                                <li><a href="www" >Blockbuster</a></li>
                            </ol>
                        </CardText>
                        </CardBody>
                        <Button color="secondary" className="cardButton">Button</Button>
                    </Card>
            </div>
        </div>
    )
}

export default TopTenCards
