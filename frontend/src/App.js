import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './container/Home';
import About from './container/About';
import Register from './container/Register';
import Login from './container/Login';
import Alert from './container/Alert';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';

import PrivateRoute from './components/routing/PrivateRoute';

//load token into global headers
if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <BrowserRouter>
            <>
              <NavBar />
              <div className="container" >
                <Alert />
                <Switch>
                  <PrivateRoute path='/' exact component={Home} />
                  <Route path='/about' exact component={About} />
                  <Route path='/register' exact component={Register} />
                  <Route path='/login' exact component={Login} />
                </Switch>
              </div>
            </>
          </BrowserRouter>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
