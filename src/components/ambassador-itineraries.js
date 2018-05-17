import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "../styles/carousel.css";

class AmbassadorItineraries extends Component {
  render() {
    let itinerariesList;
    if (this.props.itineraries) {
      let currentItineraries = this.props.itineraries.filter(itinerary => {
        return Date.now() < Date.parse(itinerary.dateEnd);
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
            <Link to={{ pathname: `/itineraries/${itinerary.id}` }} key={index}>
              <Slide
                index={index}
                key={index}
                className="ambassador-itinerary-slide"
              >
                {/* <div
                    className="itineraryheader"
                    style={{
                      backgroundImage: `url(${Background})`
                    }}
                  >

                  </div> */}

                <h3 className="place-name">
                  {itinerary.destination.locationName}
                </h3>
                <h4>Date Start: {moment(itinerary.dateStart).format("ll")}</h4>
                <h4>Date End: {moment(itinerary.dateEnd).format("ll")}</h4>

                <h4 className="itinerary-blurb">Notes: {itinerary.partners}</h4>
              </Slide>
            </Link>
          );
        });
      }
    }

    return (
      <div>
        <h1 className="carousel-title-current">Current Itineraries</h1>
        <CarouselProvider
          dragEnabled={false}
          naturalSlideWidth={70}
          naturalSlideHeight={40}
          totalSlides={this.props.itineraries.length || 1}
          visibleSlides={2}
          className="carousel-background-current"
        >
          <ButtonBack className="back-button">
            <i className="fas fa-angle-left" />
          </ButtonBack>
          <ButtonNext className="next-button">
            <i className="fas fa-angle-right" />
          </ButtonNext>
          <Slider>{itinerariesList}</Slider>

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

export default connect(mapStateToProps)(AmbassadorItineraries);
