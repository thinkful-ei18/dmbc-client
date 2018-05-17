// import actions
import {
  SEND_NEW_BLOCK_SUCCESS,
  FETCH_BLOCKS_SUCCESS
} from "../actions/block.js";

const initialState = {
  blocks: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEND_NEW_BLOCK_SUCCESS:
      return {
        ...state,
        blocks: [...state.blocks, action.newBlock]
      };
    case FETCH_BLOCKS_SUCCESS:
      return {
        ...state,
        blocks: [action.blocks]
      };
    default:
      return state;
  }
}
