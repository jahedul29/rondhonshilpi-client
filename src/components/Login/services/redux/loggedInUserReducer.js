const { SET_USER } = require("./loggedInUserActionTypes");

const initialState = {
  loggedInUser: JSON.parse(sessionStorage.getItem("loggedInUser")) || null,
};

const loggedInUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    default:
      return state;
  }
};

export default loggedInUserReducer;
