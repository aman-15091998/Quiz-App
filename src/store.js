import { configureStore } from '@reduxjs/toolkit';
import { quizReducer } from './features/quizSlice';
import { tagReducer } from './features/tagSlice';


export const store = configureStore({
  reducer: {
    quizReducer,
    tagReducer
  },
});

export default store;