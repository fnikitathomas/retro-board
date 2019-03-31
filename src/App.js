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
        let card = { text: e.target.value }
        obj.cards[eid] = card
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
        this.state.list[(1.5 * (col ** 2) - 3.5 * col + 2)].cards.push(a0)
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
        this.state.list[(-1.5 * (col ** 2) + 2.5 * col + 1)].cards.push(a0)
      }
      return obj
    })
    this.setState({ list: updatedList })
  }

  // setText = (e, col) => {
  //   console.log("in setText value =", e.target.value === "")
  //   if (e.target.value === "") {
  //     e.target.placeholder = "YOU MUST ENTER TEXT. THIS BOX WILL CLOSE NOW"
  //     e.persist()
  //     console.log("in setText - eid", e.target.id)
  //     setTimeout(() => {
  //       this.delete(e, col)
  //     }, 3000)
  //     return
  //   }
  // }

  delete = (e, col) => {
    e.preventDefault()
    let eid = parseInt(e.target.id)
    let updatedList = this.state.list.map(obj => {
      if (obj.id === col) {
        obj.cards = obj.cards.filter(c => c.id !== eid)
        obj.counter--
      }
      return obj
    })
    console.log("in delete - updatedList",updatedList)
    this.setState({ list: updatedList })
  }

  add = e => {
    e.preventDefault()
    let eid = parseInt(e.target.id)
    let updatedList = this.state.list.map(obj => {
      if (obj.id === eid) {
        let card = {id:obj.counter,text:""}
        obj.cards.push(card)
        obj.counter++
      }
      return obj
    })
    console.log("uL - add", updatedList)
    this.setState({ list: updatedList })
    //this.setState(this.state.list[e.target.id].cards = [...this.state.list[e.target.id].cards,"pp"])
  }

  /**
   * onDragEnd is responsible for synchronously updating the state of the drag and drop result
   */

  onDragEnd = result => {
    console.log("in onDragEnd - result",result)
    const {destination, source, draggableId} = result
    if(!destination) return
    // if(
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ){console.log("they're equal");return}
    let start = this.state.list[source.droppableId]
    let finish = this.state.list[destination.droppableId]
    console.log("s == f", start === finish)
    console.log("start",start,"finish",finish)
    console.log("s.i",source.index,"d.i",destination.index)
    console.log(typeof source.droppableId === 'string',"d.d",destination.droppableId)
    console.log("dragId",draggableId)
    if(start === finish){
      let updatedList = this.state.list.map(obj => {
        if(obj.id === parseInt(source.droppableId)){
          console.log("in if 2")
          let a0 = obj.cards.splice(source.index,1)
          obj.cards.splice(destination.index,0,a0[0])
        }
        return obj
      })
      console.log("updatedList",updatedList)
      this.setState({list:updatedList})
    }

    // const col = this.state.list[source.droppableId]
    // const arr = col.cards
    // arr.splice(source.index,1)
    // arr.splice(destination.index,0,draggableId)

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
                delete={this.delete}
                //setText={this.setText}
                handleChange={this.handleChange} />
            )}
          </ul>
        </DragDropContext>
      </div>
    )
  }
}

export default App;
