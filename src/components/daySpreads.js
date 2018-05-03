import React, { Component } from 'react';
import { connect } from 'react-redux';
//components
import BlockSpread from './daySpread/blockSpread';
import AddNewSpread from './daySpread/addNewSpread';


//actions

//styles
// import '../styles/daySpreads.css'


//ON FETCH HIT router.post('/block')
//WILL PLACE THE BLOCK VIA USER ID
class DaySpreads extends Component{

  //fetch blocks, here or parent component ? -m
  componentDidMount(){

  }

  render(){
    console.log(this.props.currentDay);
    return(
      <div className="day-spreads-container">

        <BlockSpread />
        <AddNewSpread />
      </div>


    )
  }
}
const mapStateToProps = (state) => ({
  currentDay:state.dashboard.currentDay,
})

export default connect(mapStateToProps)(DaySpreads);
