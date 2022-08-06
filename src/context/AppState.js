import { useEffect, useReducer } from "react";
import AppContext from "./AppContext";
import axios from "axios";
const initial_value = {
  users: [],
  isLoading: false,
};
const AppReducer = (state, action) => {
  const { type, payload } = action;
  let newEmployees = [];
  switch (type) {
    case "FETCH_DATA":
      return { ...state, users: payload };
    case "ADD_EMP":
      newEmployees = [...state.users, { ...payload }];
      console.log(newEmployees);
      return { ...state, users: newEmployees };
    case "DELETE_EMP":
      newEmployees = state.users.filter((user) => {
        return user.id !== payload;
      });
      return { ...state, users: newEmployees };
    case "EDIT_EMP":
      newEmployees = state.users.map((user) => {
        return user.id === payload.id ? { ...user, name: payload.name } : user;
      });
      return { ...state, users: newEmployees };
    default:
      break;
  }
};

const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initial_value);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
