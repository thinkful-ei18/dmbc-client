import React, { Component } from "react";
import LocationInfo from "./location-info.js";

import "../../styles/blockSpread.css";

export default class Location extends Component {
  render() {
    const isExpanded = true;
    const isSelected = this.props.selected;

    const rating =
      this.props.info.ratingCount === 0
        ? 0
        : this.props.info.ratingScore / this.props.info.ratingCount;

    const apiTags = ["Family Friendly", "Crowd Friendly", "No Pets"];

    const placeTags = apiTags.map((tag, index) => {
      return <li key={index}>{tag}</li>;
    });

    const expandedContent = isExpanded ? (
      <LocationInfo
        rating={rating}
        info={this.props.info}
        blockId={this.props.blockId}
        selected={isSelected}
        placeTags={placeTags}
        cards={this.props.cards}
      />
    ) : (
      undefined
    );

    const selectedColor = isSelected ? "gold" : "";
    return (
      <div
        className={"location"}
        style={{ backgroundColor: `${selectedColor}` }}
      >
        {expandedContent}
        <img src={this.props.info.image} alt={this.props.info.name} />
      </div>
    );
  }
}
