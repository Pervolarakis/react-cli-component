import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cli from './Components/Cli'



function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Cli />
      </header>
      <p style={{ color: "white", fontFamily: 'consolas' }}>
        Created by Pervolarakis
        <br />
        @twentytwenty
      </p>


    </div>
  );
}

export default App;
