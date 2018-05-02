import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

class AmbassadorMainPage extends Component {
   
    componentDidMount() {
		this.props.dispatch(fetchItineraries());
	}
  
  

    render() {
     
      return (
        <div>
        </div>
      );
    }
  
  
  
  const mapStateToProps = (state) =>({
  })
  
  export default connect(mapStateToProps)(AmbassadorMainPage);
  

