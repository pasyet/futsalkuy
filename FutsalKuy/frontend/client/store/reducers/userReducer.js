import {
  SET_LOADING,
  SET_ERROR,
  SET_USER,
  SET_ERROR_PARTICIPANT,
  SET_LOADING_PARTICIPANT,
  GET_PARTICIPANT
} from '../actionTypes';

const initialState = {
  participant: [],
  participantLoading: true,
  participantError: null,
  user: {},
  userLoading: true,
  userError: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOADING:
      return { ...state, userLoading: action.payload };
    case SET_ERROR:
      return { ...state, userError: action.payload };
    case GET_PARTICIPANT:
      return { ...state, participant: action.payload };
    case  SET_LOADING_PARTICIPANT:
      return { ...state, participantLoading: action.payload };
    case SET_ERROR_PARTICIPANT:
      return { ...state, participantError: action.payload };
    default:
      return state;
  }
}
