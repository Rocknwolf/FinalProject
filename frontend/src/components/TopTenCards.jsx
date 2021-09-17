import React from 'react'
import './TopTenCards.css'
import topTen from '../images/top10.jpg';

import { Card, Button, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';

function TopTenCards() {
    return (
        <div>
            <div className="mainCard">
                <div className="cardGroup">
                    <Card className="card">
                        <CardImg className="cardImg" src={topTen} alt="Card image cap" />
                        <CardBody>
                        <CardTitle tag="h3">Card Title</CardTitle>
                        <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                        <CardText>
                            <ol>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                            </ol>
                        </CardText>
                        </CardBody>
                        <Button color="secondary" className="cardButton" >Button</Button>
                    </Card>

                    <Card className="card">
                        <CardImg className="cardImg" src={topTen} alt="Card image cap" />
                        <CardBody>
                        <CardTitle tag="h3">Card Title</CardTitle>
                        <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                        <CardText>
                            <ol>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                                <li>Blockbuster</li>
                            </ol>
                        </CardText>
                        </CardBody>
                        <Button color="secondary" className="cardButton">Button</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TopTenCards
