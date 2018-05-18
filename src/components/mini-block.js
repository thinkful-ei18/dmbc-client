import React, { Component } from "react";
import "../styles/mini-block.css";
import "../styles/timeline.css";

export default class MiniBlock extends Component {
  constructor() {
    super();

    this.state = {
      baseRating: 0,
      rating: 0
    };
  }

  componentDidMount() {
    if (this.props.block.cards.length > 0) {
      this.setState({
        baseRating:
          this.props.block.cards[0].ratingScore /
          this.props.block.cards[0].ratingCount,
        rating:
          this.props.block.cards[0].ratingScore /
          this.props.block.cards[0].ratingCount
      });
    }
  }

  createSelect() {
    const values = {
      rating: this.state.rating,
      cardId: this.props.block.selectedCard,
      blockId: this.props.block.id
    };
    let stars = new Array(5);
    for (let i = 0; i < 5; i++) {
      if (i < this.state.rating) {
        stars[i] = (
          <div
            className="star-outer"
            key={i}
            onMouseEnter={event => {
              this.setState({ rating: i + 1 });
            }}
            onMouseLeave={event => {
              this.setState({ rating: this.state.baseRating });
            }}
            onClick={event => {
              this.setState({
                baseRating: this.state.rating
              });
              this.props.rateCard(values);
              alert("Thank you for your feedback!");
            }}
          >
            <i className="far fa-star">
              <i className="fas fa-star star-inner star-show" />
            </i>
          </div>
        );
      } else {
        stars[i] = (
          <div
            className="star-outer"
            key={i}
            onMouseEnter={event => {
              this.setState({ rating: i + 1 });
            }}
            onMouseLeave={event => {
              this.setState({ rating: this.state.baseRating });
            }}
          >
            <i className="far fa-star">
              <i className="fas fa-star star-inner" />
            </i>
          </div>
        );
      }
    }
    const selector = <div className="rating">{stars}</div>;
    return selector;
  }

  render() {
    console.log(this.props.block.cards);
    let smallCards = "";
    let name = "";
    let selector = this.createSelect();
    if (this.props.ambassador) {
      selector = null;
    }

    if (this.props.block.cards.length === 0) {
      smallCards = (
        <div className="mini-card">
          <h4 className="mini-card-header">
            Your ambassador is still selecting
          </h4>
        </div>
      );
    } else if (this.props.block.selectedCard) {
      smallCards = this.props.block.cards.filter(
        card => card.id === this.props.block.selectedCard
      )[0];
      smallCards = (
        <div className="mini-card">
          <h4 className="mini-card-header">{smallCards.name}</h4>
          <div className="mini-card-blurb">
            <i className="fas fa-map-pin selected-pin" />
            {smallCards.address}
            {selector}
          </div>
        </div>
      );
    } else {
      let nameTag = [];
      for (let i = 0; i < 3; i++) {
        if (!this.props.block.cards[i]) {
          break;
        }
        name = this.props.block.cards[i].name;
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
          <h3 className="mini-block-title">{this.props.block.title}</h3>
          <span>{this.props.timelineSymbol}</span>
        </div>
        {smallCards}
      </div>
    );
  }
}
