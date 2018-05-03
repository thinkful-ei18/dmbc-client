// import actions

const TEMP_TEMP = 'TEMPPLACEHOLDERFORSWITCH'
const initialState = {
  blocks:[],
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case TEMP_TEMP:
      return{
        ...state
      }
    default:
      return state;
  }
}
