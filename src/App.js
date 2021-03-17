import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'Components/NavBar';

import Home from 'Views/Home';
import Profile from 'Views/Profile';
import DetailNFT from 'Views/DetailNFT';

import './App.css';
import SubmitNFT from 'Views/SubmitNft';
import Create from 'Views/Create';
import { setAvailableSellOrder } from 'store/actions';
import store from 'store/index';
import { useEffect } from 'react';
import CreateERC721 from 'Views/Create/ERC721';
import CreateERC1155 from 'Views/Create/ERC1155';

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
            <Route exact path='/submit-Nfts' component={SubmitNFT} />
            <Route exact path='/create' component={Create} />
            <Route exact path='/create/erc721' component={CreateERC721} />
            <Route exact path='/create/erc1155' component={CreateERC1155} />
            <Route exact path='/token/:addressToken/:id' component={DetailNFT} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
