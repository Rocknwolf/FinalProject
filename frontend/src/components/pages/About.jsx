import React from 'react'
import alexImg from '../../images/about/alex.jpeg';
import friederImg from '../../images/about/Grim-Avatar.png';
import svenImg from '../../images/about/rim.jpeg';
import linkedIn from '../../images/about/linkIn.png';

function About() {
    return (
        <div className="aboutBox">
            <div className="aboutCard">
                <h2 className="aboutName" >Alex</h2>
                <img src={alexImg} alt="AlexPhoto" className="aboutImage"/>
                <h2 className="aboutName" >Groth</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat maiores temporibus ratione laboriosam reprehenderit! Rem fugiat aut provident, impedit deleniti accusantium sit aliquid fugit officiis ea expedita nihil exercitationem eveniet.</p>
                <a href="https://www.linkedin.com/in/alexander-groth-3b9b33189/" ><img src={linkedIn} alt="LinkedIn" className="linkedin" /></a>
            </div>
            <div className="aboutCard">
                <h2 className="aboutName">Frieder</h2>
                <img src={friederImg} alt="FriederPhoto" className="aboutImage"/>
                <h2 className="aboutName" >Neudert</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, sint est exercitationem, inventore dolore, aliquid quidem repellendus harum rem amet earum omnis. Tempora nisi quisquam non eaque eligendi, tenetur similique?</p>
                <a href="https://www.linkedin.com/in/frieder-neudert-081280217/" ><img src={linkedIn} alt="LinkedIn" className="linkedin" /></a>
            </div>
            <div className="aboutCard">
                <h2 className="aboutName">Sven</h2>
                <img src={svenImg} alt="SvenPhoto" className="aboutImage"/>
                <h2 className="aboutName" >Nemitz</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptas eum veritatis repellendus debitis, corrupti, sunt repudiandae sint, commodi sequi vero at consequatur culpa fugiat dicta quae voluptates ullam quaerat.</p>
                <a href="https://www.linkedin.com/in/sven-nemitz-a79129217/" ><img src={linkedIn} alt="LinkedIn" className="linkedin" /></a>
            </div>
        </div>
    )
}

export default About
