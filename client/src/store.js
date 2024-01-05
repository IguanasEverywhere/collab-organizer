import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './reduxSlices/darkModeSlice';

export default configureStore({
  reducer: {
    viewMode: darkModeReducer
  }
})