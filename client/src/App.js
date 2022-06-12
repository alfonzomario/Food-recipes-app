import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Landing';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route exact path ='/home' component={Home}/>
        <Route exact path ='/recipe' component={RecipeCreate}/>
        <Route exact path ='/home/:id' component={Detail}/>
      </Switch>
      <h1>Henry Food</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
