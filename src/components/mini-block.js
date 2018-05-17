import React from "react";
import "../styles/mini-block.css";
import "../styles/timeline.css";

export default function MiniBlock(props) {
  let smallCards = "";
  let name = "";
  if (props.block.cards.length === 0) {
    smallCards = (
      <div className="mini-card">
        <h4 className="mini-card-header">Your ambassador is still selecting</h4>
      </div>
    );
  } else if (props.block.selectedCard) {
    smallCards = props.block.cards.filter(
      card => card.id === props.block.selectedCard
    )[0];
    smallCards = (
      <div className="mini-card">
        <h4 className="mini-card-header">{smallCards.name}</h4>
        <p className="mini-card-blurb">
          <i className="fas fa-map-pin selected-pin" />
          {smallCards.address}
        </p>
      </div>
    );
  } else {
    let nameTag = [];
    for (let i = 0; i < 3; i++) {
      if (!props.block.cards[i]) {
        break;
      }
      name = props.block.cards[i].name;
      nameTag.push(
        <div className="mini-card-options-container" key={i}>
          <i className="fas fa-map-pin" />
          <li className="mini-card-options" key={i}>
            {name}
          </li>
        </div>
      );
    }
    smallCards = (
      <div className="mini-card">
        <h4 className="mini-card-header">Go to day to make your choice</h4>
        <div>
          <ul>{nameTag}</ul>
        </div>
      </div>
    );
  }

  return (
    <div className="mini-block">
      <div className="mini-block-nav">
        <h3 className="mini-block-title">{props.block.title}</h3>
        <span>{props.timelineSymbol}</span>
      </div>
      {smallCards}
    </div>
  );
}
