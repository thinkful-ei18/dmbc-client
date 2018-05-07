import { FETCH_TRIP_DETAILS_SUCCESS } from '../actions/tripForm';
import {
  SET_DASHBOARD_CURRENT_DAY,
  SET_DASHBOARD_TRIPDAYS,
  PUSH_TEMPORARY_NEW_BLOCK
} from '../actions/dashboard';
import { PUT_CARD_ON_BLOCK_SUCCESS, SELECT_CARD_ON_BLOCK_SUCCESS } from '../actions/block';

const initialState = {
  currentItinerary:undefined,
  tripDays:undefined,
  currentDay:undefined,
  userBlocks:[],
  temporaryBlocks:[]
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case FETCH_TRIP_DETAILS_SUCCESS:
      return{
        ...state,
        currentItinerary:action.tripDetails,
        userBlocks:[action.tripDetails.blocks]
      }
    case SET_DASHBOARD_TRIPDAYS:
      return{
        ...state,
        tripDays:action.tripDays
      }
    case SET_DASHBOARD_CURRENT_DAY:
      return{
        ...state,
        currentDay:action.date
      }
    case PUSH_TEMPORARY_NEW_BLOCK:
      console.log('payload',action.newBlock);
      console.log('target',state);
      return{
        ...state,
        currentItinerary:{
          ...state.currentItinerary,
          blocks:[...state.currentItinerary.blocks, action.newBlock]
        }
      }
    case PUT_CARD_ON_BLOCK_SUCCESS:
      let blocks = state.currentItinerary.blocks;
      blocks = blocks.map(block => {
        if (block.id === action.updatedBlock.id) {
          block = Object.assign({}, action.updatedBlock);
        }
        return block;
      })
      return{
        ...state,
        currentItinerary: {
          ...state.currentItinerary,
          blocks
        }
      };
    case SELECT_CARD_ON_BLOCK_SUCCESS:
      blocks = state.currentItinerary.blocks;
      blocks = blocks.map(block => {
        if (block.id === action.updatedBlock.id) {
          block = Object.assign({}, action.updatedBlock);
        }
        return block;
      })
      return {
        ...state,
        currentItinerary: {
          ...state.currentItinerary,
          blocks
        }
      }
    default:
      return state;

  }
}
