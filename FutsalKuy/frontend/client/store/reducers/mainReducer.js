import {
  GET_EVENTS,
  SET_ERROR,
  SET_LOADING_EVENTS,
  GET_FIELD,
  SET_ERROR_FIELD,
  SET_LOADING,
  SET_PAY,
  SET_LOADING_PAY,
  SET_ERROR_PAY
} from '../actionTypes';

const initialState = {
  events: [],
  eventsLoading: true,
  eventsError: null,
  field: {},
  loadingiField: true,
  fieldError: null,
  pay: {},
  loadingPay: true,
  errorPay: null
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: action.payload };
    case SET_LOADING_EVENTS:
      return { ...state, eventsLoading: action.payload };
    case SET_ERROR:
      return { ...state, eventsError: action.payload };
    case GET_FIELD:
      return {...state, field: action.payload};
    case SET_LOADING:
      return {...state, loadingiField: action.payload}
    case SET_ERROR_FIELD:
      return { ...state, fieldError: action.payload };
    case SET_PAY:
      return {...state, pay: action.payload};
    case SET_LOADING_PAY:
      return {...state, loadingPay: action.payload}
    case SET_ERROR_PAY:
      return { ...state, errorPay: action.payload };
    default:
      return state;
  }
}
