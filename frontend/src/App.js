import './App.css';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import RegistrationForm from './components/pages/RegistrationForm';
import MainPage from './components/pages/MainPage';
import Profil from './components/pages/Profil';


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/register" component={RegistrationForm}/>
            <Route path="/profile" component={Profil}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
