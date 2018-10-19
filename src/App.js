import React, { Component } from 'react';
//import logo from './logo.svg';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Retro Board</h2>
          <ul className="container">
            <Contak text={"Went Well"}/>
            <Contak text={"To Do"}/>
            <Contak text={"Action Items"}/>
        </ul>
      </div>
    );
  }
}

function Contak(props){
    return <li>
            <h3>{props.text}</h3>
            <ul className="stack">
              <li><button type="button" className="block">+</button></li>
            </ul>
           </li>
}

export default App;
