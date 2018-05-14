import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import Background from "../assets/barPlaceHolder.jpg";
import "pure-react-carousel/dist/react-carousel.es.css";
import "../styles/carousel.css";
// import '../styles/oneDayView.css'; import '../styles/cards.css';

class AmbassadorExplore extends Component {
  render() {
    const apiTags = ["Family Friendly", "Crowd Friendly", "No Pets"];

    const placeTags = apiTags.map((tag, index) => {
      return <li key={index}>{tag}</li>;
    });
    let exploreCardsList =
      this.props.cards &&
      this.props.cards.map((card, index) => {
        return (
          <Slide className="ambassador-cards-slide" index={index} key={index}>
            
              <h3 className="place-name">{card.name}</h3>
              <div className="placeTags">
                <ul>{placeTags}</ul>
              </div>
              <div>
                <h4 className="explore-itinerary-blurb">{card.description}</h4>
              </div>
              <div className="explore-itinerary-controls">
                <button>
                <Link to={`/cards/${card.id}`}>Edit Card</Link>
              </button>
              </div>
          </Slide>
        );
      });

    // let itinerariesTotal = this.props.itineraries.length
    return (
      <div>
        <h1 className="carousel-title-card">Explore Your Cards</h1>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={70}
          totalSlides={this.props.cards.length || 1}
          visibleSlides={2}
          className="carousel-background-cards"
        >
          <Slider>{exploreCardsList}</Slider>
          <ButtonBack>
            <i class="fas fa-angle-left" /> Back
          </ButtonBack>
          <ButtonNext>
            Next <i class="fas fa-angle-right" />
          </ButtonNext>
          {/* <h1>{itinerariesTotal}</h1> */}
        </CarouselProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({ cards: state.cards.cards });

export default connect(mapStateToProps)(AmbassadorExplore);
