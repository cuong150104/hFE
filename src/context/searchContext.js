import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const searchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      console.log("chekk case");
      return action.payload;
    case "RESET_SEARCH":
      console.log("chekk case reset");
      return INITIAL_STATE;
    default:
      console.log("chekk case defau");
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <searchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        state,
        dispatch,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};


















