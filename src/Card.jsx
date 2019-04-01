import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div``

const Card = (props) =>{
    return <Draggable draggableId={props.col+"-"+props.idx} index={props.idx}>
            {(provided) => (
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
            <li>
                <div className="card" style={{backgroundColor: props.color}}>
                <div>
                    <a className="ua" id={props.idx} href="./like" onClick={e => props.like(e,props.col)}>&#9650;{` ${props.card.like}`}</a>
                    <a className="da" id={props.idx} href="./dislike" onClick={e => props.hate(e,props.col)}>&#9660;{` ${props.card.hate}`}</a>
                </div>
                <textarea type="text"
                            id={props.idx}
                            className="card"
                            placeholder="Enter text here"
                            value={props.card.text}
                            onBlur={e => props.setText(e,props.col)}
                            onChange={e => props.handleChange(e,props.col)}>
                </textarea>
                <div>
                    <a className="ltCtl" id={props.idx} href="./left" onClick={e => props.left(e,props.col)}>&#9668;</a>
                    <a className="clCtl" id={props.idx} href="./close" onClick={e => props.delete(e,props.col)}>X</a>
                    <a className="rtCtl" id={props.idx} href="./right" onClick={e => props.right(e,props.col)}>&#9658;</a>
                </div>
                </div>
            </li>
            </Container>
            )}
           </Draggable>
  }

export default Card