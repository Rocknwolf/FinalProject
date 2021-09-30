import './App.css';
import React, { createContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import RegistrationForm from './components/pages/RegistrationForm.jsx';
import MainPage from './components/pages/MainPage.jsx';

import Chat from './components/Chat.jsx';

import logIOToggler from './lib/logIOToggler.js'

const globalContext = createContext();

function App() {
    const [context, setContext] = useState({
        isLogin: false,
        username: '',
        updateContext: (object) => {
            const newContext = { ...context };
            Object.entries(object)
                .forEach(item => newContext[item[0]] = item[1]);
            setContext(newContext);
        }
    });

    const setLogin = () => {
        const isLogin = logIOToggler();
        context.updateContext({
            isLogin: isLogin,
            username: isLogin ? context.username : ''
        });
    };

    const [reactIntevalHelper, dispatchReactIntevalHelper] = React.useReducer((state, action) => {
        //if (action.type === 'contextUpdate') return state = context;
        setLogin();
        return state;
    }, null);

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

    return (
        <div className="App">
            <globalContext.Provider value={ context }>
                <Router>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/register" component={RegistrationForm}/>
                        <Route path="/chat" component={Chat}/>
                    </Switch>
                </Router>
            </globalContext.Provider>
        </div>
    );
}

export default App;
export { globalContext };
