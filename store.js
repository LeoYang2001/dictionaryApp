import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import langSettingReducer from './slices/langSettingSlice';
import langReducer from './slices/langSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    lang: langReducer,
    langSetting : langSettingReducer
  },
});

export default store;
