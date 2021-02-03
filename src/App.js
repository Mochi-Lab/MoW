import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'Components/NavBar';

import Home from 'Views/Home';
import Profile from 'Views/Profile';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='center'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/profile/:id' component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
