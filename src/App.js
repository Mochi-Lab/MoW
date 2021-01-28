import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'Components/NavBar';
import store from './store';
import { Provider } from 'react-redux';

import Home from 'Views/Home';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <div className='page center'>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
