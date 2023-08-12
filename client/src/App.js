import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/home/home.component';
import Details from './pages/details/details.component';
import Landing from './pages/landing/landing.component';
import Create from './pages/create/create.component';
import NavBar from './components/navbar/navbar.component';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/details/:id" component={Details} />
          <Route path="/create" component={Create} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
