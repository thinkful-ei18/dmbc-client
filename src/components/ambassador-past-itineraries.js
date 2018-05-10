import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import Background from "../assets/barPlaceHolder.jpg";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "../styles/carousel.css";

class AmbassadorPastItineraries extends Component {
  render() {
    let itinerariesList;
    if (this.props.itineraries) {
      let currentItineraries = this.props.itineraries.filter(itinerary => {
        return Date.now() > Date.parse(itinerary.dateEnd);
      });
      if (currentItineraries.length === 0) {
        itinerariesList = (
          <Slide className="ambassador-itinerary-slide">
            <h4>No Current Itineraries</h4>
          </Slide>
        );
      } else {
        itinerariesList = currentItineraries.map((itinerary, index) => {
          return (
            <Link  to={{ pathname: `/itineraries/${itinerary.id}` }} key={index}>
              <Slide
                index={index}
                key={index}
                className="ambassador-cards-slide"
              >
                <div className="itinerary-container" key={index}>
                  <div
                    className="card-header"
                    style={{
                      backgroundImage: `url(${Background})`
                    }}
                  >
                    <span className="place-name">
                      {itinerary.destination.locationName}
                    </span>
                  </div>

                  <div className="card-body">
                    <span className="blurb-header">
                     Date Start: {moment(itinerary.dateStart).format("ll")}
                    </span>
                    <span className="blurb-header">
                      Date End: {moment(itinerary.dateEnd).format("ll")}
                    </span>

                    <span className="card-blurb">Notes: {itinerary.partners}</span>
                  </div>
                </div>
              </Slide>
            </Link>
          );
        });
      }
    }

    return (
      <div>
        <h1 className="carousel-title-past">Past Itineraries</h1>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={40}
          totalSlides={this.props.itineraries.length || 1}
          visibleSlides={2}
          className="carousel-background-past"
        >
          <Slider>{itinerariesList}</Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
          {/* <h1>{itinerariesTotal}</h1> */}
        </CarouselProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itineraries: state.itineraries.itineraries,
  loading: state.itineraries.loading
});

export default connect(mapStateToProps)(AmbassadorPastItineraries);
