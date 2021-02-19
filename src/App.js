import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'Components/NavBar';

import Home from 'Views/Home';
import Profile from 'Views/Profile';
import DetailNFT from 'Views/DetailNFT';

import './App.css';
import Create from 'Views/Create';
import MyCollection from 'Views/MyCollection';
import ConnectWallet from 'Components/ConnectWallet';
import { web3Default } from 'Connections/web3Modal';
import { useSelector } from 'react-redux';
import { setWeb3, setAvailableSellOrder } from 'store/actions';
import store from 'store/index';
import { useEffect } from 'react';
import ToggleDarkMode from 'Components/ToggleDarkMode';

function App() {
  const { web3 } = useSelector((state) => state);
  useEffect(() => {
    async function fetchDataInit() {
      await store.dispatch(setWeb3(web3Default));
      await store.dispatch(setAvailableSellOrder());
    }
    fetchDataInit();
  }, []);
  return (
    <div className='root PE'>
      <BrowserRouter>
        <div className={`page center content`}>
          <div className='bg-header'></div>
          <ToggleDarkMode />
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={web3 ? Profile : ConnectWallet} />
            <Route exact path='/create' component={web3 ? Create : ConnectWallet} />
            <Route exact path='/collection' component={web3 ? MyCollection : ConnectWallet} />
            <Route
              exact
              path='/token/:addressToken/:id'
              component={web3 ? DetailNFT : ConnectWallet}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
