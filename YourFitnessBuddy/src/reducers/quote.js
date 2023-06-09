import { FETCH_QUOTES_SUCCESS } from "../actions/quote";

const initialState = {
  quotes: [],
};

const quotes = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUOTES_SUCCESS:
      return {
        ...state,
        quotes: action.payload,
      };
    default:
      return state;
  }
};

export default quotes;
