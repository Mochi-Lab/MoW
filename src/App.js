import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'Components/NavBar';
import './App.css';

import { setAvailableSellOrder } from 'store/actions';
import Airdrops from 'Views/Airdrops';
import store from 'store/index';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    async function fetchDataInit() {
      document
        .getElementsByTagName('HTML')[0]
        .setAttribute('data-theme', localStorage.getItem('theme'));
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
            {/* <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/submit-Nfts' component={SubmitNFT} />
            <Route exact path='/create' component={Create} />
            <Route exact path='/browse' component={Browse} />
            <Route exact path='/create/erc721' component={CreateERC721} />
            <Route exact path='/create/erc1155' component={CreateERC1155} />
            <Route exact path='/token/:addressToken/:id' component={DetailNFT} /> */}
            <Route exact path='/airdrops' component={Airdrops} /> 
            <Route exact path='/' component={Airdrops} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
