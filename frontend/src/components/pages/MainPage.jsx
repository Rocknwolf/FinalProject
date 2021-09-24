import React from 'react'
import { useEffect } from 'react';

import './MainPage.css'
import logo from '../../images/logo.jpg';
import Login from '../Login.jsx';
import Logout from '../Logout.jsx';
import Navbar from '../Navbar.jsx';

import ImageCarousel from '../ImageCarousel.jsx';
import TopTenCards from '../TopTenCards.jsx';
import Footer from '../Footer.jsx';

import logIOToggler from '../../lib/logIOToggler.js'

function MainPage() {

    useEffect(() => {
        logIOToggler();
        const interval = setInterval(() => {
            logIOToggler();
        }, 60 * 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div>
            <div className="mainHeader">
                <img src={logo} alt="" className="mainLogo" />

                <div className="mainTitel">
                    <h1 contenteditable="true">Zelluloid Zombies</h1>
                    <p contenteditable="true">blablabla guckstu</p>
                </div>

                <div className="dropLogin">
                    <Login/>
                    {/* <RegistrationForm/> */}
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
