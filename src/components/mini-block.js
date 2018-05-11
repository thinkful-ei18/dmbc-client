import React from "react";
import '../styles/mini-block.css'

export default function MiniBlock(props) {
  let smallCards = '';
  let name = '';
  if (props.block.cards.length === 0){
    smallCards = 
      <div className="mini-card">
        <p className="mini-card-header">Your ambassador is still selecting</p>
      </div>
  } else if (props.block.selectedCard) {
    smallCards = props.block.cards.filter(card => card.id === props.block.selectedCard)[0]
    smallCards = (
    <div className="mini-card">
      <p className="mini-card-header">{smallCards.name}</p>
      <p className="mini-card-blurb">{smallCards.address}</p>
      <p className="mini-card-blurb">Rating: {Math.floor(smallCards.ratingScore / smallCards.ratingCount)}</p>
    </div>
    )
  } else {
    let nameTag = [];
    for (let i = 0; i < 3; i++) {
      if (!props.block.cards[i]) {
        break;
      }
      name = props.block.cards[i].name
      nameTag.push (<p className="mini-card-header" key={i}>{name}</p>)
    }
    smallCards = (
      <div className="mini-card">
        {nameTag}
      </div>
    )
  }

  return (
    <div className="mini-block">
      <h4 className="mini-block-title">{props.block.title}</h4>
      {smallCards}
    </div>
  )
}