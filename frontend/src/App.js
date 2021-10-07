import './App.css';
import React, { createContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import RegistrationForm from './components/pages/RegistrationForm';
import MainPage from './components/pages/MainPage';
import Profile from './components/pages/Profil.jsx';
import RegelnChat from './components/RegelnChat.jsx';
import FAQ from './components/FAQ.jsx';
import DSGVO from './components/pages/DSGVO.jsx';
import Impressum from './components/pages/Impressum.jsx';
import AGB from './components/pages/AGB.jsx';

import Chat from './components/Chat.jsx';

import logIOToggler from './lib/logIOToggler.js'

const globalContext = createContext();

function App() {

    const [context, setContext] = useState({
        isLogin: false,
        username: '',
        lang: document.lastElementChild.attributes.lang.value, // html lang attribute
        profileData: null,
        updateContext: (context, updates) => {
            const newContext = { ...context };
            Object.entries(updates)
                .forEach(item => newContext[item[0]] = item[1]);
            setContext(newContext);
        }
    });
    
    const setLogin = () => {
        const isLogin = logIOToggler();
        context.updateContext(context, {
            isLogin: isLogin,
            username: isLogin ? context.username : ''
        });
    };

    // eslint-disable-next-line no-unused-vars
    const [reactIntevalHelper, dispatchReactIntevalHelper] = React.useReducer((state, action) => {
        //if (action.type === 'contextUpdate') return state = context;
        setLogin();
        return state += 1;
    }, 0);

    useEffect(() => {
        let interval;

        (() => {
            setLogin();
            interval = setInterval( () => {
                dispatchReactIntevalHelper();
            }, 60 * 1000);
        })();
        return () => {
            clearInterval(interval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // get username from sessionStorage
        const sessionStorageUsername = '';

        if (!context.isLogin && sessionStorageUsername ) {
            // if no token, but sessionStorageUsername
            // delete sessionStorageUsername
        }
        if (context.isLogin && context.username === "") {
            
            const username = sessionStorage.getItem('user');
            console.log(username);

            context.updateContext(context,
                {
                    username: username
                }
            )
        }
        if(context.isLogin && context.username !== "") {
            sessionStorage.setItem('user', context.username);
        }
        setTimeout( () => {
            if(!context.isLogin && context.username === "") {
                sessionStorage.removeItem('user');
            }
        }, 5000)
        // if(context.isLogin && context.username === null) {
        //     sessionStorage.removeItem('user');
        // }
            
    }, [context]);

    return (
        <div className="App">
            <globalContext.Provider value={ context }>
                <Router>
                        <Header />
                        <Navbar />
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/register" component={RegistrationForm}/>
                        <Route path="/chat" component={Chat}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/chatrules" component={RegelnChat}/>
                        <Route exact path="/faq" component={FAQ}/>
                        <Route path="/dsgvo" component={DSGVO}/>
                        <Route path="/impressum" component={Impressum}/>
                        <Route path="/agb" component={AGB}/>
                    </Switch>
                </Router>
            </globalContext.Provider>
        </div>
    );
    
}

export default App;
export { globalContext };
