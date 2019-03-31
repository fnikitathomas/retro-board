import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div``

const Card = (props) =>{
    console.log("card props and value",props)
    return <Draggable draggableId={props.idx+""} index={props.idx}>
            {(provided) => (
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
            <li>
                <div className="card" style={{backgroundColor: props.color}}>
                <textarea type="text"
                            id={props.idx}
                            className="card"
                            placeholder="Enter text here"
                            value={props.card.text}
                            //onBlur={e => props.setText(e,props.col)}
                            onChange={e => props.handleChange(e,props.col)}>
                </textarea>
                <div><a className="ltCtl" id={props.idx} href="./no" onClick={e => props.left(e,props.col)}>&lt;</a>
                    <a className="clCtl" id={props.idx} href="./no" onClick={e => props.delete(e,props.col)}>x</a>
                    <a className="rtCtl" id={props.idx} href="./no" onClick={e => props.right(e,props.col)}>&gt;</a>
                </div>
                </div>
            </li>
            </Container>
            )}
           </Draggable>
  }

export default Card