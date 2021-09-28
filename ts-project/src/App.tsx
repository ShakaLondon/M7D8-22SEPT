import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import SearchComponent from './Components/Main-Search'
import DetailComponent from './Components/Search-Detail'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route exact path="/">
            <Redirect to="/Search" />
          </Route>
          <Route exact path="/Search" render={(routerProps) => <SearchComponent {...routerProps} />} />
          <Route exact path="/Detail" render={(routerProps) => <DetailComponent {...routerProps} />} />
        </header>
      </div>
    </Router>
  );
}

export default App;
