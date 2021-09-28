import './App.css';
import { createContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import RegistrationForm from './components/pages/RegistrationForm';
import MainPage from './components/pages/MainPage';
import Profile from './components/pages/Profil.jsx';
import DSGVO from './components/pages/DSGVO';
import Impressum from './components/pages/Impressum';
import AGB from './components/pages/AGB';

import logIOToggler from './lib/logIOToggler.js'

const globalContext = createContext();

function App() {

    
    const [context, setContext] = useState({
        isLogin: false,
        updateContext: (key, value) => {
            const newContext = { ...context };
            newContext[key] = value;
            setContext(newContext);
        }
    });
    
    const setLogin = () => {
        context.updateContext('isLogin' ,logIOToggler());
    };
    
    useEffect( () => {
        let interval;
        (() => {
            setLogin();
            interval = setInterval( async () => {
                setLogin();
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
                        <Route path="/profile" component={Profile}/>
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
