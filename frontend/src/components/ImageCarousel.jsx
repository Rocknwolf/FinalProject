import React from 'react'
import '../components/ImageCarousel.css';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpeg';
import img4 from '../images/img4.png';
import img5 from '../images/img5.jpg';
import img6 from '../images/img6.webp';

function ImageCarousel() {
    return (
        <div>
            <div className="background">
                <div className="container">
                    <div className="images">
                        <img src={img1}  alt="bild"/>
                        <img src={img2}  alt="bild"/>
                        <img src={img3} alt="bild"/>
                        <img src={img4}  alt="bild"/>
                        <img src={img5}  alt="bild"/>
                        <img src={img6} alt="bild"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageCarousel

