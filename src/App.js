import React, { Component } from 'react';
//import logo from './logo.svg';
import './style.css';

const list = [
  {
    id : 0,
    title : "Went well",
    showCard : false,
    addCard : (func0,func1,func2,func3,func4,color,value)=> {
      let id = "x"+count++
      let myProps = {id:id,deleteCard:func0,handleChange:func1,moveRight:func2,moveLeft:func3,setText:func4,key:id,color:color,value:value}
      return <Card {...myProps}/>},
    cards : [],
    color : "pink"
  },
  {
    id : 1,
    title : "To Improve",
    showCard : false,
    addCard : (func0,func1,func2,func3,func4,color,value)=> {
      let id = "y"+count++
      let myProps = {id:id,deleteCard:func0,handleChange:func1,moveRight:func2,moveLeft:func3,setText:func4,key:id,color:color,value:value}
      return <Card {...myProps}/>},
    cards : [],
    color : "yellow"
  },
  {
    id : 2,
    title : "Action Items",
    showCard : false,
    addCard : (func0,func1,func2,func3,func4,color,value)=> {
      let id = "z"+count++
      let myProps = {id:id,deleteCard:func0,handleChange:func1,moveRight:func2,moveLeft:func3,setText:func4,key:id,color:color,value:value}
      return <Card {...myProps}/>},
    cards : [],
    color : "blue"
  }
]

let count = 0

class App extends Component {
  constructor(){
    super()
    this.state = {list : list, value: "", current: "",}
    this.buttonClick = this.buttonClick.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.moveRight = this.moveRight.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.setText = this.setText.bind(this)
  }
  
  buttonClick(ev,id,func0,func1,func2,func3,func4){
    let a0 = null
    this.setState({value:"",current:""})
    console.log("in buttonClick value",this.state.value)
    //console.log(this.state.list)
    for(let obj of this.state.list){
      if(obj.id === id){ 
        console.log("here af")
        //this.setState({value:""})
        //console.log("in for loop value: value and current","V"+this.state.value,"C"+this.state.current)
        a0 = obj.addCard(func0,func1,func2,func3,func4,obj.color,"")
        obj.cards.push(a0)
      }

    }
    //
    this.setState({list:this.state.list})
  }

  moveLeft(ev,id,func0,func1,func2,func3,func4){
    ev.preventDefault()
    let a0 = null
    console.log("in moveLeft: value and current","V"+this.state.value,"C"+this.state.current)
    //this.state.value === this.state.current ? this.setState({value:this.state.current}) : this.setState({value:this.state.value})
    if(this.state.value === this.state.current) this.setState({value:this.state.current})
    else this.setState({value:this.state.value})
    console.log("state.value",this.state.value)
    let updatedList = this.state.list.map((obj)=>{
      let found = obj.cards.findIndex((element)=> element.key === id)

      if(obj.id === 0){
        if(found !== -1){
          obj.cards.splice(found,1)
          a0 = this.state.list[2].addCard(func0,func1,func2,func3,func4,this.state.list[2].color,this.state.value)
          this.state.list[2].cards.push(a0)     
        }
      }

      if(obj.id === 1){
        if(found !== -1){
          obj.cards.splice(found,1)
          a0 = this.state.list[0].addCard(func0,func1,func2,func3,func4,this.state.list[0].color,this.state.value)
          this.state.list[0].cards.push(a0)     
        }
      }

      if(obj.id === 2){
        if(found !== -1){
          obj.cards.splice(found,1)
          a0 = this.state.list[1].addCard(func0,func1,func2,func3,func4,this.state.list[1].color,this.state.value)
          this.state.list[1].cards.push(a0)    
        }
      }

      return obj
    })

    this.setState({list:updatedList,})
  }
  
  moveRight(ev,id,func0,func1,func2,func3,func4){
    ev.preventDefault()
    let a0 = null
    console.log("in moveRight: value and current","V"+this.state.value,"C"+this.state.current)
    let updatedList = this.state.list.map((obj)=>{
      let found = obj.cards.findIndex((element)=> element.key === id)

      if(obj.id === 0){
        if(found !== -1){
          obj.cards.splice(found,1)
          a0 = this.state.list[1].addCard(func0,func1,func2,func3,func4,this.state.list[1].color,this.state.value)
          this.state.list[1].cards.push(a0)     
        }
      }

      if(obj.id === 1){
        if(found !== -1){
          obj.cards.splice(found,1)
          a0 = this.state.list[2].addCard(func0,func1,func2,func3,func4,this.state.list[2].color,this.state.value)
          this.state.list[2].cards.push(a0)     
        }
      }

      if(obj.id === 2){
        if(found !== -1){
          obj.cards.splice(found,1)
          a0 = this.state.list[0].addCard(func0,func1,func2,func3,func4,this.state.list[0].color,this.state.value)
          this.state.list[0].cards.push(a0)    
        }
      }

      return obj
    })
    this.setState({list:updatedList,})
  }

  setText(ev){
    console.log("in setText:",ev.target.value)
    this.setState({value:ev.target.value,current:ev.target.value})
  }

  deleteCard(ev,id){
    ev.preventDefault()
    let updatedList = this.state.list.map((obj)=>{
      let found = obj.cards.findIndex((element)=> element.key === id)
      if(found !== -1)
        obj.cards.splice(found,1)
      return obj
    })
    console.log("uL",updatedList)
    this.setState({list:updatedList})
  }

  handleChange(ev){
    console.log(ev.target.value)
    this.setState({value:ev.target.value,current:ev.target.value})
  }
 
  render() {
    console.log(this)
    return (
      <div className="App">
        <h2>Retro Board</h2>
          <ul className="container">
            {this.state.list.map((item) =>
                <Contak key={item.title+item.id} text={item.title} buttonClick={this.buttonClick} deleteCard={this.deleteCard} handleChange={this.handleChange} moveRight={this.moveRight} moveLeft={this.moveLeft} setText={this.setText} showCard={item.showCard} id={item.id} cards={item.cards} />
            )}
        </ul>
      </div>
    )
  }
}

function Contak(props){
  return <li>
          <h3>{props.text}</h3>
          <ul className="stack">
            <li><button id={props.text} type="button" className="block" onClick={e =>props.buttonClick(e,props.id,props.deleteCard,props.handleChange,props.moveRight,props.moveLeft,props.setText)}>+</button></li>
            {props.cards.map((card)=> {
              console.log("card",card)
              return card || null
              })}
          </ul>
          </li>
}

function Card(props){
  console.log("card props and value",props)
  return <li>
          <div className="card" style={{backgroundColor: props.color}}>
            <textarea type="text" className="card" placeholder="Enter text here" defaultValue={props.value} onChange={e =>props.handleChange.bind(this)} onBlur={e => props.setText(e)}></textarea>
            <div><a className="ltCtl" href="./logo" onClick={e=>props.moveLeft(e,props.id,props.deleteCard,props.handleChange,props.moveRight,props.moveLeft,props.setText)}>&lt;</a><a className="clCtl" href="./logo" onClick={e =>props.deleteCard(e,props.id)}>x</a><a className="rtCtl" href="./logo" onClick={e =>props.moveRight(e,props.id,props.deleteCard,props.handleChange,props.moveRight,props.moveLeft,props.setText)}>&gt;</a></div>
          </div>
         </li>
}

export default App;
