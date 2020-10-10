import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cli from './Components/Cli'
import socketio from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";


function App() {
  const socket = socketio(ENDPOINT)
  return (
    <div className="App">
      <header className="App-header">
        <Cli />
      </header>

    </div>
  );
}

export default App;
