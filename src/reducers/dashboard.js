import { FETCH_TRIP_DETAILS_SUCCESS } from '../actions/tripForm';
import {
  SET_DASHBOARD_CURRENT_DAY,
  SET_DASHBOARD_TRIPDAYS,
  PUSH_TEMPORARY_NEW_BLOCK,
  SET_TOOLBELT_DISPLAY
} from '../actions/dashboard';
import { PUT_CARD_ON_BLOCK_SUCCESS, SELECT_CARD_ON_BLOCK_SUCCESS, REMOVE_SELECT_CARD_ON_BLOCK_SUCCESS } from '../actions/block';
import { RATE_CARD_SUCCESS } from "../actions/cards";

const initialState = {
  currentItinerary:undefined,
  tripDays:undefined,
  currentDay:undefined,
  toolBeltDisplay: 'cards'
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case FETCH_TRIP_DETAILS_SUCCESS:
      return{
        ...state,
        currentItinerary:action.tripDetails
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
    case SET_TOOLBELT_DISPLAY:
      return{
        ...state,
        toolBeltDisplay: action.display
      }
    case PUSH_TEMPORARY_NEW_BLOCK:
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
    case REMOVE_SELECT_CARD_ON_BLOCK_SUCCESS:
      blocks = state.currentItinerary.blocks;
      let blockIndex = blocks.findIndex(block => block.id === action.blockId);
      delete blocks[blockIndex].selectedCard;
      return {
        ...state,
        currentItinerary: {
          ...state.currentItinerary,
          blocks
        }
      }
    case RATE_CARD_SUCCESS:
      blocks = state.currentItinerary.blocks
      blockIndex = state.currentItinerary.blocks.findIndex(block => block.id === action.card.blockId);
      blocks[blockIndex].cards = blocks[blockIndex].cards.map(card => {
        if (card.id === action.card.id) {
          delete action.card.blockId;
          return action.card;
        }
        return card;
      })

      return {
        ...state,
        currentItinerary: {
          ...state.currentItinerary,
          blocks
        }
      };
    default:
      return state;

  }
}
