import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './reduxSlices/darkModeSlice';
import loggedInUserReducer from './reduxSlices/loggedInUserSlice';

export default configureStore({
  reducer: {
    viewMode: darkModeReducer,
    loggedInUser: loggedInUserReducer
  }
})