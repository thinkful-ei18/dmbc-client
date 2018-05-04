// import actions
import { SEND_NEW_BLOCK_SUCCESS } from '../actions/block.js';


const initialState = {
  blocks:[],
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case SEND_NEW_BLOCK_SUCCESS:
      return{
        ...state,
        blocks:[...state.blocks, action.newBlock]
      }
    default:
      return state;
  }
}
