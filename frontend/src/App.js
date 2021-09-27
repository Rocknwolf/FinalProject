import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RegistrationForm from './components/pages/RegistrationForm.jsx';
import MainPage from './components/pages/MainPage.jsx';


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={MainPage}>
            </Route>
            <Route path="/register" component={RegistrationForm}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
