import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import RegistrationForm from './components/pages/RegistrationForm.jsx';
import MainPage from './components/pages/MainPage.jsx';
import Forum from './components/Forum.jsx';
import Profile from './components/pages/Profile.jsx';
import RegelnChat from './components/RegelnChat.jsx';
import FAQ from './components/FAQ.jsx';
import DSGVO from './components/pages/DSGVO.jsx';
import Impressum from './components/pages/Impressum.jsx';
import AGB from './components/pages/AGB.jsx';
import About from './components/pages/About.jsx';

import Movies from './components/pages/Movies.jsx';

import Chat from './components/Chat.jsx';

import HistoryHelper from './components/HistoryHelper.jsx';
import logIOToggler from './lib/logIOToggler.js'
import EditProfile from './components/pages/EditProfile.jsx';

const globalContext = createContext();

const initContextValues = {
    isLogin: false,
    username: '',
    lang: document.lastElementChild.attributes.lang.value, // html lang attribute
    profileData: null,
}

function App() {
    const [context, setContext] = useState({
        ...initContextValues,
        updateContext: (context, updates) => {
            const newContext = { ...context };
            Object.entries(updates)
                .forEach(item => newContext[item[0]] = item[1]);
            setContext(newContext);
        }
    });

    const [historyHelper, setHistoryHelper] = useState(false);
    
    const setLogin = () => {
        const isLogin = logIOToggler();

        if(!isLogin && context.isLogin) {
            context.updateContext(context, initContextValues );
            setHistoryHelper(true);
        }
    };

    // eslint-disable-next-line no-unused-vars
    const [reactIntervalHelper, dispatchReactIntervalHelper] = React.useReducer((state, action) => {
        //if (action.type === 'contextUpdate') return context;
        setLogin();
        return state += 1;
    }, 0);

    useEffect(() => {
        let interval;

        (() => {
            interval = setInterval(() => {
                dispatchReactIntervalHelper();
            }, 10 * 1000);
        })();
        return () => {
            clearInterval(interval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const isLogin = logIOToggler();
        
        if (isLogin && context.username === '') {
            const username = sessionStorage.getItem('user');
            context.updateContext(context,
            {
                isLogin: isLogin,
                username: username
            });
        }
        if(isLogin && context.username !== '') {
            sessionStorage.setItem('user', context.username);
        }

        if(!isLogin && context.username === '') {
            sessionStorage.removeItem('user');
        }
            
    }, [context]);

    return (
        <div className="App">
            <globalContext.Provider value={ context }>
                <Router>
                    <HistoryHelper historyHelper={historyHelper} setHistoryHelper={setHistoryHelper} />
                    <Header />
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/register" component={!context.isLogin ? RegistrationForm : null}/>
                        <Route path="/chat" component={Chat}/>
                        <Route path="/profile" component={context.isLogin ? Profile : null}/>
                        <Route path="/edit-profile" component={EditProfile}/>
                        <Route path="/forum" component={Forum}/>
                        <Route path="/movies" component={Movies}/>
                        <Route path="/chatrules" component={RegelnChat}/>
                        <Route exact path="/faq" component={FAQ}/>
                        <Route path="/dsgvo" component={DSGVO}/>
                        <Route path="/impressum" component={Impressum}/>
                        <Route path="/agb" component={AGB}/>
                        <Route path="/about" component={About}/>
                    </Switch>
                </Router>
            </globalContext.Provider>
        </div>
    );
}

export default App;
export { globalContext, initContextValues };
