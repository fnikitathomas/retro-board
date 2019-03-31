import React from 'react'
import Card from './Card'
import {Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div``

const Contak = (props) =>{
    console.log("props.id",props.id)
    return(
    <li>
        <h3>{props.text}</h3>
        <ul className="stack">
        <li>
            <button id={props.id} type="button" className="block" onClick={e =>props.add(e)}>+</button>
        </li>
        {/**
          * A droppable uses the render/props pattern which expects its child to
          * be a function that returns a react component. This stops react-b-dnd
          * from having to create DOM nodes.
         */}
        <Droppable droppableId={props.id+""}>
            {(provided) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                            {props.cards.map((card,i)=> {
                                console.log("card",card)
                                return <Card key={`card-column-${props.id}-${i}`}
                                            idx={i}
                                            col={props.id}
                                            card={card}
                                            color={props.color}
                                            left={props.left}
                                            right={props.right}
                                            delete={props.delete}
                                            // setText={props.setText}
                                            handleChange={props.handleChange}
                                        />
                                })}
                    {provided.placeholder}
                </Container>
            )}
        </Droppable>
        </ul>
    </li>
    )   
}

export default Contak