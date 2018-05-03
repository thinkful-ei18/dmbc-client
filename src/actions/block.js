import {API_BASE_URL} from '../config.js';

export const CREATE_NEW_BLOCK = 'CREATE_NEW_BLOCK'
export const createNewBlock = () => {

}

export const fetchBlocks = () => (dispatch, getState) =>{
  console.log('fetching blocks');
  // const authToken = getState().auth.authToken;


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
  .then((res) => dispatch(sendNewBlockSuccess(res)))
  .catch((err) => dispatch(sendNewBlockError(err)))



}
