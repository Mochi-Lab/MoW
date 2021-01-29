import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'Components/NavBar';

import Home from 'Views/Home';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='page center'>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
