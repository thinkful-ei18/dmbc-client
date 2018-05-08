import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchItineraries } from "../actions/ambassador-itineraries";
import moment from "moment";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./ambassador-itinerary-carousel.css";

class AmbassadorPastItineraries extends Component {
  componentWillMount() {
    this.props.dispatch(fetchItineraries());
  }
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
          console.log(itinerary);

          return (
            <Link to={{pathname:"/dashboard", state:{itineraryId: itinerary.id}}}>
              <Slide
                className="ambassador-itinerary-slide"
                key={index}
                index={index}
              >
                <div>
                  <h4>{itinerary.destination.locationName}</h4>
                  <h4>{moment(itinerary.dateStart).format("ll")}</h4>
                  <h4>to</h4>
                  <h4>{currentItineraries.length}</h4>
                  <h4>{moment(itinerary.dateEnd).format("ll")}</h4>
                </div>
              </Slide>
            </Link>
          );
        });
      }
    }

    return (
      <div>
        <h1>Past Itineraries</h1>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={40}
          totalSlides={1 || this.props.itineraries.length}
          visibleSlides={2}
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
