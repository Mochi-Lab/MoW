import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'Components/NavBar';

import Home from 'Views/Home';
import Profile from 'Views/Profile';
import DetailNFT from 'Views/DetailNFT';

import './App.css';
import Create from 'Views/Create';
import MyCollection from 'Views/MyCollection';
import { setAvailableSellOrder } from 'store/actions';
import store from 'store/index';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    async function fetchDataInit() {
      await store.dispatch(setAvailableSellOrder());
    }
    fetchDataInit();
  }, []);
  return (
    <div style={{ height: '100vh' }}>
      <BrowserRouter>
        <div className='page content'>
          <div className='bg-header'></div>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/submit-Nfts' component={Create} />
            <Route exact path='/create' component={MyCollection} />
            <Route exact path='/token/:addressToken/:id' component={DetailNFT} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
