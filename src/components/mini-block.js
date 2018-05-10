import React from "react";
import '../styles/mini-block.css'

export default function MiniBlock(props) {
  let smallCards;
  if (props.block.selectedCard) {
    smallCards = props.block.cards.filter(card => card.id === props.block.selectedCard)[0]
    smallCards = (
    <div className="mini-card">
      <h3 className="mini-card-header">{smallCards.name}</h3>
      <p className="mini-card-blurb">{smallCards.address}</p>
    </div>
    )
  } else {
    smallCards = 
      <div className="mini-card">
        <h3 className="mini-card-header">No card selected</h3>
      </div>
  }

  return (
    <div className="mini-block">
      <h4 className="mini-block-title">{props.block.title}</h4>
      {smallCards}
    </div>
  )
}