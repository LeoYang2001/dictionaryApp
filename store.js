import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import langReducer from './slices/langSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    lang: langReducer,
  },
});

export default store;
