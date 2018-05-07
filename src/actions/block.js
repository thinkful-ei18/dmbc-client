import {API_BASE_URL} from '../config.js';
import { pushTemporaryNewBlock } from './dashboard';
export const CREATE_NEW_BLOCK = 'CREATE_NEW_BLOCK'
export const createNewBlock = () => {

}

export const fetchBlocks = () => (dispatch, getState) =>{

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
    return dispatch(pushTemporaryNewBlock(formattedBlock));
    // return dispatch(sendNewBlockSuccess(formattedBlock));
  })
  .catch((err) => dispatch(sendNewBlockError(err)))
}

export const PUT_CARD_ON_BLOCK_REQUEST = 'PUT_CARD_ON_BLOCK_REQUEST'
export const putCardOnBlockRequest = () => ({
  type: PUT_CARD_ON_BLOCK_REQUEST

})

export const PUT_CARD_ON_BLOCK_SUCCESS = 'PUT_CARD_ON_BLOCK_SUCCESS'
export const putCardOnBlockSuccess = (updatedBlock) => ({
  type: PUT_CARD_ON_BLOCK_SUCCESS,
  updatedBlock
})

export const PUT_CARD_ON_BLOCK_ERROR = 'PUT_CARD_ON_BLOCK_ERROR'
export const putCardOnBlockError = (err) => ({
  type: PUT_CARD_ON_BLOCK_ERROR,
  err
})

export const putCardOnBlock = ids => (dispatch, getState) => {
  dispatch(putCardOnBlockRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/block/${ids.blockID}/cards`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      card: ids.cardID
    })
  })
  .then(response => response.json())
  .then(updatedBlock => {
    const formattedBlock = Object.assign({}, updatedBlock, {
      date: new Date(updatedBlock.date)
    })
    dispatch(putCardOnBlockSuccess(formattedBlock))
  })
  .catch(err => dispatch(putCardOnBlockError(err)));
}


export const SELECT_CARD_ON_BLOCK_REQUEST = 'SELECT_CARD_ON_BLOCK_REQUEST'
export const selectCardOnBlockRequest = () => ({
  type: SELECT_CARD_ON_BLOCK_REQUEST

})

export const SELECT_CARD_ON_BLOCK_SUCCESS = 'SELECT_CARD_ON_BLOCK_SUCCESS'
export const selectCardOnBlockSuccess = (updatedBlock) => ({
  type: SELECT_CARD_ON_BLOCK_SUCCESS,
  updatedBlock
})

export const SELECT_CARD_ON_BLOCK_ERROR = 'SELECT_CARD_ON_BLOCK_ERROR'
export const selectCardOnBlockError = (err) => ({
  type: SELECT_CARD_ON_BLOCK_ERROR,
  err
})

export const selectCardOnBlock = ids => (dispatch, getState) => {
  dispatch(selectCardOnBlockRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/block/${ids.blockID}/select`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      selection: ids.cardID
    })
  })
    .then(response => response.json())
    .then(updatedBlock => {
      const formattedBlock = Object.assign({}, updatedBlock, {
        date: new Date(updatedBlock.date)
      })
      dispatch(selectCardOnBlockSuccess(formattedBlock))
    })
    .catch(err => dispatch(selectCardOnBlockError(err)));
}