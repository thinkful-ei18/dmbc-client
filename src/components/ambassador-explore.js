import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { fetchCards } from "../actions/cards";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import Background from '../assets/barPlaceHolder.jpg'
import "pure-react-carousel/dist/react-carousel.es.css";
import "./ambassador-itinerary-carousel.css";
// import '../styles/oneDayView.css';
// import '../styles/cards.css';

class AmbassadorExplore extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCards());
      }
  


  render() {
    const apiTags = ['Family Friendly', 'Crowd Friendly', 'No Pets'];
    
    const placeTags = apiTags.map((tag,index) => {
      return (<li key={index}>{tag}</li>)
    });
    let exploreCardsList =
      this.props.cards &&
      this.props.cards.map((card, index) => { 
          return ( 
            <Slide
              className="ambassador-cards-slide"
              index={index}
              key={index}
            >
        <div className='cardContainer-expanded' key={index}>
          <div className='cardHeader' style={{'backgroundImage':`url(${Background})`}}>
            <span className='placeName'>{card.name}</span>
          </div>
          <div className='placeTags'>
            <ul>
              {placeTags}
            </ul>
          </div>
          <div>
          <div className='cardBody'>
            <span className='blurbHeader'>Details</span>
            <span className='cardBlurb'>
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
        <h1>Explore Your Cards</h1>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={40}
          totalSlides={1 || this.props.cards.length}
          visibleSlides={2}
        >
          <Slider>{exploreCardsList}</Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
          {/* <h1>{itinerariesTotal}</h1> */}
        </CarouselProvider>
      </div>
    );
  }

}


const mapStateToProps = state => ({
  cards: state.cards.cards,
  loading: state.itineraries.loading
});

export default connect(mapStateToProps)(AmbassadorExplore);