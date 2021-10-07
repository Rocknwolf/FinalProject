import React from 'react'
import topTen from '../images/top10.jpg';

import { Card, Button, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';

function TopTenCards() {
    
    return (
        <div>
            <div className="mainCard">
                <Card className="card">
                    <CardImg className="cardImg" src={topTen} alt="Card image cap" />
                    <CardBody>
                    <CardTitle tag="h3">newest</CardTitle>
                    <CardText>Die neusten Blockbuster</CardText>
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
                    <Button color="secondary" className="cardButton" >Button</Button>
                </Card>
            </div>
            
            <div className="mainCard">
                <Card className="card">
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
