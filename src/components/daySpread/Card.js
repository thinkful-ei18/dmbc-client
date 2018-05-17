import React, { Component } from "react";
import CardButton from "../buttons/cardButton";

export default class Card extends Component {
  render() {
    // const apiTags = ["Family Friendly", "Crowd Friendly", "No Pets"];
    // const placeTags = apiTags.map((tag, index) => {
    //   return <li key={index}>{tag}</li>;
    // });
    // const placeTags = this
    //   .props
    //   .info
    //   .tags
    //   .map((tag, index) => {
    //     return (
    //       <li key={index}>{tag}</li>
    //     )
    //   })
    let cardControls;
    if (this.props.currentUser === this.props.card.ambassador) {
      cardControls = (
        <div className="card-controls">
          <CardButton
            buttonText={"Edit Card"}
            buttonFunction={event =>
              this.props.changeDisplay({
                display: "edit",
                cardID: this.props.card.id
              })
            }
          />
        </div>
      );
    } else {
      cardControls = null;
    }

    return (
      <div
        className="card-container-expanded"
        style={{ cursor: "default" }}
        key={this.props.index}
      >
        <div
          className="card-header"
          style={{ backgroundImage: `url(${this.props.card.image})` }}
        >
          <div className="card-title">
            <p className="place-name">{this.props.card.name}</p>
            <p className="card-blurb">{this.props.card.address}</p>
          </div>
        </div>
        <div className="place-tags">
          <ul>{/* {placeTags} */}</ul>
        </div>
        <div>
          <div className="card-body">
            <span className="blurb-header">Details</span>
            <span className="card-blurb">{this.props.card.description}</span>
          </div>
          {cardControls}
        </div>
      </div>
    );
  }
}
