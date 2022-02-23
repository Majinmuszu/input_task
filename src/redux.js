import { createStore } from "redux";

// STORE
const initialState = {
  users: [],
  text: "",
  autofill: [],
};

export const store = createStore(usersReducer);

//REDUCERS
function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USERS":
      return {
        users: action.payload,
        text: state.text,
        autofill: [...state.autofill],
      };
    case "ADD_TEXT":
      return {
        users: [...state.users],
        text: action.payload,
        autofill: [...state.autofill],
      };
    case "ADD_AUTOFILL":
      return {
        users: [...state.users],
        text: state.text,
        autofill: action.payload,
      };
    default:
      return state;
  }
}

// ACTIONS
export const addUsers = (users) => ({
  type: "ADD_USERS",
  payload: users,
});
export const addText = (txt) => ({
  type: "ADD_TEXT",
  payload: txt,
});
export const addAutofill = (autofill) => ({
  type: "ADD_AUTOFILL",
  payload: autofill,
});
