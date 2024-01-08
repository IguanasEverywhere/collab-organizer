import { createSlice } from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    value: 'light'
  },
  reducers: {
    changeView: (state, newView) => {
      state.value = newView.payload
    }
  }
})

export const { changeView } = darkModeSlice.actions

export default darkModeSlice.reducer