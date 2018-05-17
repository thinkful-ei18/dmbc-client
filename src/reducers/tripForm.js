import {
  SET_DATE_START,
  SET_DATE_END,
  SET_TRIP_DESTINATION,
  SET_TRIP_PARTNERS
} from "../actions/tripForm";

const initialState = {
  dateStart: null,
  dateEnd: null,
  destination: null,
  partners: "Just me"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATE_START:
      return {
        ...state,
        dateStart: action.dateStart
      };
    case SET_DATE_END:
      return {
        ...state,
        dateEnd: action.dateEnd
      };
    case SET_TRIP_DESTINATION:
      return {
        ...state,
        destination: action.destination
      };
    case SET_TRIP_PARTNERS:
      return {
        ...state,
        partners: action.partners
      };

    default:
      return state;
  }
}
