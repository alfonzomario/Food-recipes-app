import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Landing';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route path ='/home' component={Home}/>
        <Route path ='/recipe' component={RecipeCreate}/>
      </Switch>
      <h1>Henry Food</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
