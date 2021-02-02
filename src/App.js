import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'Components/NavBar';

import Home from 'Views/Home';
import Profile from 'Views/Profile';
import DetailNFT from 'Views/DetailNFT';

import './App.css';

function App() {
  return (
    <div className='root PE'>
      <BrowserRouter>
        <NavBar />
        <div className='page center content'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/profile/:id' component={Profile} />
            <Route exact path='/token/:addressToken/:id' component={DetailNFT} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
