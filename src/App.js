import React, { Component } from 'react';
//import logo from './logo.svg';
import './style.css';

const list = [
  {
    id : 0,
    title : "Went well",
    showCard : false,
    addCard : ()=> <Card key={"x"+count++}/>,
    cards : []
  },
  {
    id : 1,
    title : "To Improve",
    showCard : false,
    addCard : ()=> <Card key={"y"+count++}/>,
    cards : []
  },
  {
    id : 2,
    title : "Action Items",
    showCard : false,
    addCard : ()=> <Card key={"z"+count++}/>,
    cards : []
  }
]
let count = 0
class App extends Component {
  constructor(){
    super()
    this.state = {list : list}
    this.buttonClick = this.buttonClick.bind(this)
  }
  
  buttonClick(ev,id){
    console.log(ev.target,id)
    //const nextId = this.state.cards.length + 1
    //this.setState({cards: this.state.cards.concat([nextId])})
    let a0 = null
    console.log("A0",a0)
    //console.log(this.state.list)
    for(let obj of this.state.list){
      console.log(obj.title)
      if(obj.id === id){ 
        console.log("here af")
        a0 = obj.addCard()
        obj.cards.push(a0)
      }

    }
    console.log("curr",this.state.list)
    this.setState({list:this.state.list})
    //let updatedList = this.state.list.filter((item) => item.id === id)
    //this.setState({list:updatedList,})
  }
 
  render() {
    console.log(this)
    return (
      <div className="App">
        <h2>Retro Board</h2>
          <ul className="container">
            {this.state.list.map((item) =>
                <Contak key={item.title+item.id} text={item.title} buttonClick={this.buttonClick} showCard={item.showCard} id={item.id} cards={item.cards}/>
            )}
        </ul>
      </div>
    );
  }
}

function Contak(props){
  //console.log("this",this)
  //console.log("state:",this.state)
  return <li>
          <h3>{props.text}</h3>
          <ul className="stack">
            <li><button id={props.text} type="button" className="block" onClick={e =>props.buttonClick(e,props.id)}>+</button></li>
            {props.cards.map((card)=> {
              console.log("card",card)
              return card || null
              })}
          </ul>
          </li>
}

function Card(){
  return <li><div className="card">Place Holder</div></li>
}

export default App;
