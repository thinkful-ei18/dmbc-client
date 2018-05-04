import React, { Component } from 'react';
import { connect } from 'react-redux';
//components
import BlockSpread from './daySpread/blockSpread';
import AddNewSpread from './daySpread/addNewSpread';

import '../styles/placeCard.css';

class DaySpreads extends Component{

  componentWillMount(){

  }

  componentDidUpdate(){

  }
  assembleBlocks(){
    const blocksToBeAssembled = this.props.blocks;
    if(blocksToBeAssembled === undefined){
      console.log('the blocks were empty');
      return(<li>loading</li>);
    }

   const filteredBlocks = blocksToBeAssembled.filter((block) => {
      return block.date.getDate() === this.props.currentDay.getDate();
    })

    const blocksAssembled = filteredBlocks.map((currentBlock) => {
      return(
        <li>
          <BlockSpread blockName={currentBlock.title}/>
        </li>
    )
    });
    return blocksAssembled;
  }
  
  render(){
    const blocks = this.assembleBlocks();
    return(
      <div className="day-spreads-container">
        <ul>
          {blocks}
        </ul>
        <AddNewSpread />
      </div>


    )
  }
}

const mapStateToProps = (state) => ({
  currentDay:state.dashboard.currentDay,
  blocks:state.dashboard.currentItinerary.blocks
})

export default connect(mapStateToProps)(DaySpreads);
