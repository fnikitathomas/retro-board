import React, { Component } from 'react'
import Contak from './Contak'
import {DragDropContext} from 'react-beautiful-dnd'
import './style.css'

const list = [
  {
    id: 0,
    title: "Went well",
    showCard: false,
    cards: [],
    counter: 0,
    color: "pink"
  },
  {
    id: 1,
    title: "To Improve",
    showCard: false,
    cards: [],
    counter: 0,
    color: "orange"
  },
  {
    id: 2,
    title: "Action Items",
    showCard: false,
    cards: [],
    counter: 0,
    color: "blue"
  }
]

class App extends Component {

  state = { list: list }

  handleChange = (e, col) => {
    let eid = parseInt(e.target.id)
    let updatedList = this.state.list.map(obj => {
      if (obj.id === col) {
        obj.cards[eid].text = e.target.value
      }
      return obj
    })
    this.setState({ list: updatedList })
  }

  like = (e, col) => {
    e.preventDefault()
    let eid = parseInt(e.target.id)
    let updatedList = this.state.list.map(obj => {
      if(obj.id === col){
        obj.cards[eid].like++
      }
      return obj
    })
    this.setState({ list: updatedList })
  }

  hate = (e, col) => {
    e.preventDefault()
    let eid = parseInt(e.target.id)
    let updatedList = this.state.list.map(obj => {
      if(obj.id === col){
        obj.cards[eid].hate++
      }
      return obj
    })
    this.setState({ list: updatedList })
  }

  left = (e, col) => {
    e.preventDefault()
    let eid = parseInt(e.target.id), a0
    let updatedList = this.state.list.map(obj => {
      if (obj.id === col) {
        a0 = obj.cards.splice(eid, 1)[0]
        obj.cards.map((o,i) => o.id = i)
        obj.counter--
        this.state.list[(1.5 * (col ** 2) - 3.5 * col + 2)].cards.push(a0)
        this.state.list[(1.5 * (col ** 2) - 3.5 * col + 2)].cards.map((o,i) => o.id = i)
        this.state.list[(1.5 * (col ** 2) - 3.5 * col + 2)].counter++
      }
      return obj
    })
    this.setState({ list: updatedList })
  }

  right = (e, col) => {
    e.preventDefault()
    let eid = parseInt(e.target.id), a0
    let updatedList = this.state.list.map(obj => {
      if (obj.id === col) {
        a0 = obj.cards.splice(eid, 1)[0]
        obj.cards.map((o,i) => o.id = i)
        obj.counter--
        this.state.list[(-1.5 * (col ** 2) + 2.5 * col + 1)].cards.push(a0)
        this.state.list[(-1.5 * (col ** 2) + 2.5 * col + 1)].cards.map((o,i) => o.id = i)
        this.state.list[(-1.5 * (col ** 2) + 2.5 * col + 1)].counter++
      }
      return obj
    })
    this.setState({ list: updatedList })
  }

  setText = (e, col) => {
    console.log("in setText value =", e.target.value === "")
    if (e.target.value === "") {
      e.target.placeholder = "YOU MUST ENTER TEXT. THIS BOX WILL CLOSE NOW"
      e.persist()
      console.log("in setText - eid", e.target.id)
      setTimeout(() => {
        this.delete(e, col)
      }, 3000)
      return
    }
  }

  delete = (e, col) => {
    e.preventDefault()
    let eid = parseInt(e.target.id)
    let updatedList = this.state.list.map(obj => {
      if (obj.id === col) {
        obj.cards = obj.cards.filter(c => c.id !== eid)
        obj.cards.map((o,i) => o.id = i)
        obj.counter--
      }
      return obj
    })
    this.setState({ list: updatedList })
  }

  add = e => {
    e.preventDefault()
    let eid = parseInt(e.target.id)
    let updatedList = this.state.list.map(obj => {
      if (obj.id === eid) {
        let card = { id: obj.counter, like: 0, hate: 0, text:"" }
        obj.cards.push(card)
        obj.counter++
      }
      return obj
    })
    this.setState({ list: updatedList })
  }

  /**
   * onDragEnd is responsible for synchronously updating the state of the drag and drop result
   */

  onDragEnd = result => {
    const {destination, source} = result
    if(!destination) return
    let start = this.state.list[parseInt(source.droppableId)]
    let finish = this.state.list[parseInt(destination.droppableId)]
    if(start === finish){
      let updatedList = this.state.list.map(obj => {
        if(obj.id === parseInt(source.droppableId)){
          let a0 = obj.cards.splice(source.index,1)
          obj.cards.splice(destination.index,0,a0[0])
          obj.cards.map((o,i) => o.id = i)
        }
        return obj
      })
      this.setState({list:updatedList})
    }
   if(start !== finish) {
     let updatedList = this.state.list.map(obj => {
      if(obj.id === parseInt(source.droppableId)){
        let a0 = obj.cards.splice(source.index,1)
        obj.cards.map((o,i) => o.id = i)
        this.state.list[parseInt(destination.droppableId)].cards.splice(destination.index,0,a0[0])
        this.state.list[parseInt(destination.droppableId)].cards.map((o,i) => o.id = i)
      }
      return obj
    })
    this.setState({list:updatedList})
   }
  }

  render() {
    return (
      <div className="App">
        <h2>Retro Board</h2>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <ul className="container">
            {this.state.list.map((item) =>
              <Contak key={item.title + item.id}
                id={item.id}
                text={item.title}
                cards={item.cards}
                color={item.color}
                add={this.add}
                left={this.left}
                right={this.right}
                like={this.like}
                hate={this.hate}
                delete={this.delete}
                setText={this.setText}
                handleChange={this.handleChange} />
            )}
          </ul>
        </DragDropContext>
      </div>
    )
  }
}

export default App;
