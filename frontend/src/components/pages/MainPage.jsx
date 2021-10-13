import React from 'react'

import './MainPage.css'
import logo from '../../images/logo.jpg';

import ImageCarousel from '../ImageCarousel.jsx';
import TopTenCards from '../TopTenCards.jsx';
import Footer from '../Footer.jsx';

function MainPage() {
    return (
        <div className="mainPageBody">
            <div className="mainCarousel">
                <ImageCarousel/>
            </div>

            <div className="mainCards">
                <TopTenCards/>
            </div>

            <span className="divider"></span>

            <div className="footer">
                <p className="pFooter">&copy; 2021 by Alex, Frieder, Sven</p>
                <img src={logo} alt="" className="footerLogo" />
                <Footer/>
            </div>
            
        </div>
    )
}

export default MainPage
