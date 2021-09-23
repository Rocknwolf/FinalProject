import React from 'react'
import './MainPage.css'
import logo from '../../images/logo.jpg';
import Login from '../Login.jsx';
import Logout from '../Logout.jsx';
import Navbar from '../../components/Navbar.jsx';

import ImageCarousel from '../ImageCarousel.jsx';
import TopTenCards from '../TopTenCards.jsx';
import Footer from '../Footer.jsx';

function MainPage() {
    return (
        <div>
            <div className="mainHeader">
                <img src={logo} alt="" className="mainLogo" />

                <div className="mainTitel">
                    <h1>Zelluloid Zombies</h1>
                    <p>blablabla guckstu</p>
                </div>

                <div className="dropLogin">
                    <Login/>
                    <Logout/>
                </div>
            </div>
            <div className="navigation">
                <Navbar/>
            </div>

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
