import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import statementReducer from "../features/statement/statementSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    statement: statementReducer,
  },
});
