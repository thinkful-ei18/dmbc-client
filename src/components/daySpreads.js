import React, { Component } from 'react';
import { connect } from 'react-redux';
//components
import BlockSpread from './daySpread/blockSpread';
import AddNewSpread from './daySpread/addNewSpread';
import Card from './daySpread/Card'

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
    return(

      <div className="day-spreads-container">

        <BlockSpread />
        <AddNewSpread />
      </div>


    )
  }
}
const mapStateToProps = (state) => ({
  tempDeleteMe:true,
})

export default connect(mapStateToProps)(DaySpreads);
