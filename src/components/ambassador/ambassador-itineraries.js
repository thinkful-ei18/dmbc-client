import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { fetchItineraries } from "../../actions/ambassador-itineraries";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./ambassador-itinerary-carousel.css";

class AmbassadorItineraries extends Component {
  componentWillMount() {
    this.props.dispatch(fetchItineraries());
  }
  render() {
    let itinerariesList =
      this.props.itineraries &&
      this.props.itineraries.map((key, index) => {
        let myDate = Date.parse(this.props.itineraries[index].dateEnd);
        if (Date.now() < myDate) {
          return (
            <Slide
              className="ambassador-itinerary-slide"
              key={index}
              index={index}
            >
              <h4>{this.props.itineraries[index].destination.locationName}</h4>
              <h4>
                {moment(this.props.itineraries[index].dateStart).format("ll")}
              </h4>
              <h4>to</h4>
              <h4>{this.props.itineraries.length}</h4>
              <h4>
                {moment(this.props.itineraries[index].dateEnd).format("ll")}
              </h4>
            </Slide>
          );
        } else {
          return (
            <Slide key={index} className="ambassador-itinerary-slide">
              <h4>No Current Itineraries</h4>
              
            </Slide>
          );
        }
      });

      // let itinerariesTotal = this.props.itineraries.length

    return (
      <div>
        <h1>Current Itineraries</h1>
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

export default connect(mapStateToProps)(AmbassadorItineraries);
