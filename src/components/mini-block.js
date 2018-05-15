import React from "react";
import '../styles/mini-block.css'
import '../styles/timeline.css'

export default function MiniBlock(props) {
  let smallCards = '';
  let name = '';
  if (props.block.cards.length === 0){
    smallCards =
      <div className="mini-card">
        <h4 className="mini-card-header">Your ambassador is still selecting</h4>
      </div>
  } else if (props.block.selectedCard) {
    smallCards = props.block.cards.filter(card => card.id === props.block.selectedCard)[0]
    smallCards = (
    <div className="mini-card">
      <h4 className="mini-card-header">{smallCards.name}</h4>
      <p className="mini-card-blurb">{smallCards.address}</p>
    </div>
    )
  } else {
    let nameTag = [];
    for (let i = 0; i < 3; i++) {
      if (!props.block.cards[i]) {
        break;
      }
      name = props.block.cards[i].name
      nameTag.push (<h4 className="mini-card-header" key={i}>{name}</h4>)
    }
    smallCards = (
      <div className="mini-card">
        {nameTag}
      </div>
    )
  }

  return (
    <div className="mini-block">
      <div className="mini-block-nav">
        <h3 className="mini-block-title">{props.block.title}</h3>
        {/* {timeline} */}
        <span>{props.timelineSymbol}</span>
      </div>
      {smallCards}
    </div>
  )
}
