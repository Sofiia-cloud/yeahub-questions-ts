import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import quizReducer from "./slices/quizSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
