import { configureStore } from "@reduxjs/toolkit";
import modelsReducer from "./features/models/modelsSlice";

export const store = configureStore({
  reducer: { models: modelsReducer },
});
