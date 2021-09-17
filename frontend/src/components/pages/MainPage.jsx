import React from 'react'
import './MainPage.css'
import logo from '../../images/logo.png';
import Login from '../Login.jsx';
import Navbar from '../../components/Navbar.jsx';

import ImageCarousel from '../ImageCarousel.jsx';
// import TopTenCards from '../TopTenCards.jsx';

function MainPage() {
    return (
        <div>
            <div className="mainHeader">
                <img src={logo} alt="" className="mainLogo" />

                    <div className="mainTitel">
                        <h1>Titel</h1>
                        <p>blablabla guckstu</p>
                    </div>

                    <div className="dropLogin">
                        <Login/>
                    </div>
            </div>
                    <div className="navigation">
                        <Navbar/>
                    </div>

                    <div className="mainCarousel">
                        <ImageCarousel/>
                    </div>

                    <div className="mainCards">
                        {/* <TopTenCards/> */}
                    </div>

            
        </div>
    )
}

export default MainPage
