import {API_BASE_URL} from '../config.js';
import { pushTemporaryNewBlock } from './dashboard';
export const CREATE_NEW_BLOCK = 'CREATE_NEW_BLOCK'
export const createNewBlock = () => {

}

export const fetchBlocks = () => (dispatch, getState) =>{
<<<<<<< HEAD
=======
  console.log('fetching blocks');
>>>>>>> 464fba6d02777361c29865eb14e594ea4ab5b12c

}

//send new block
export const SEND_NEW_BLOCK_REQUEST = 'SEND_NEW_BLOCK_REQUEST'
export const sendNewBlockRequest = () => ({
  type:SEND_NEW_BLOCK_REQUEST

})

// on sucess lets push the new block to the state -m
// instead of remaking the block request -m
export const SEND_NEW_BLOCK_SUCCESS = 'SEND_NEW_BLOCK_SUCCESS'
export const sendNewBlockSuccess = (newBlock) => ({
  type:SEND_NEW_BLOCK_SUCCESS,
  newBlock
})

export const SEND_NEW_BLOCK_ERROR = 'SEND_NEW_BLOCK_ERROR'
export const sendNewBlockError = (err) => ({
  type:SEND_NEW_BLOCK_ERROR,
  err
})

export const sendNewBlock = (newBlock) => (dispatch, getState) => {
  dispatch(sendNewBlockRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/block`,{
    method:'POST',
    headers:{
      Authorization:`Bearer ${authToken}`,
      'Content-Type':'application/json'
    },
    body:JSON.stringify(newBlock)
  })
  .then((response) => response.json())
  .then((block) => {
    const formattedBlock = Object.assign({},block,{
      date:new Date(block.date)
    })
<<<<<<< HEAD
    return dispatch(pushTemporaryNewBlock(formattedBlock));
    // return dispatch(sendNewBlockSuccess(formattedBlock));
=======
    dispatch(pushTemporaryNewBlock(formattedBlock));
    return dispatch(sendNewBlockSuccess(formattedBlock));
>>>>>>> 464fba6d02777361c29865eb14e594ea4ab5b12c
  })
  .catch((err) => dispatch(sendNewBlockError(err)))



}
