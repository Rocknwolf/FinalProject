import './App.css';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import RegistrationForm from './components/pages/RegistrationForm';
import MainPage from './components/pages/MainPage';
import Navbar from './components/Navbar.jsx';


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/register" component={RegistrationForm}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
