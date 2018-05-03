import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchItineraries } from '../actions/ambassador-itineraries';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';



class AmbassadorItineraries extends Component {
    componentDidMount() {
		this.props.dispatch(fetchItineraries());
  }
  render() {

    console.log("itineraries", this.props.itineraries)

    let itineraries = this.props.itineraries &&
	this.props.itineraries.map ((index) => (
		<Slide key={index} index={index}>
    <h1>{this.props.itineraries.partners}</h1>
    </Slide>
    ))
    console.log("partners", this.props.itineraries)
    
  
      return (
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={3}
        >
           <Slider>
          {itineraries}
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
        </CarouselProvider>

        
      );
    }
  }
  
  
  const mapStateToProps = (state) =>({
   itineraries: state.itineraries.itineraries
  })
  
  export default connect(mapStateToProps)(AmbassadorItineraries);