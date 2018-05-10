import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from "pure-react-carousel";
import Background from '../assets/barPlaceHolder.jpg'
import "pure-react-carousel/dist/react-carousel.es.css";
import "../styles/carousel.css"
// import '../styles/oneDayView.css'; import '../styles/cards.css';

class AmbassadorExplore extends Component {
  render() {
    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];

    const placeTags = apiTags.map((tag, index) => {
      return (
        <li key={index}>{tag}</li>
      )
    });
    let exploreCardsList = this.props.cards && this
      .props
      .cards
      .map((card, index) => {
        return (
          <Slide className="ambassador-cards-slide" index={index} key={index}>
            <div className='card-container-expanded' key={index}>
              <div
                className='card-header'
                style={{
                'backgroundImage': `url(${Background})`
              }}>
                <span className='place-name'>{card.name}</span>
              </div>
              <div className='placeTags'>
                <ul>
                  {placeTags}
                </ul>
              </div>
              <div>
                <div className='card-body'>
                  <span className='blurb-header'>Details</span>
                  <span className='card-blurb'>
                    {card.description}
                  </span>
                </div>
                <div className='cardControls'>
                  <Link to={`/cards/${card.id}`}>Edit Card</Link>
                </div>
              </div>
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
           naturalSlideHeight={40}
          totalSlides={this.props.cards.length || 1}
          visibleSlides={2}
          className="carousel-background-cards">
          <Slider>{exploreCardsList}</Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
          {/* <h1>{itinerariesTotal}</h1> */}
        </CarouselProvider>
      </div>
    );
  }

}

const mapStateToProps = state => ({cards: state.cards.cards});

export default connect(mapStateToProps)(AmbassadorExplore);