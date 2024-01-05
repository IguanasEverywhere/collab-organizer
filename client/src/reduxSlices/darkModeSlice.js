import { createSlice } from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    value: 'light'
  },
  reducers: {
    changeView: state => {
      if (state.value === 'light') {
        state.value = 'dark'
      } else {
        state.value = 'light'
      }
    }
  }
})

export const { changeView } = darkModeSlice.actions

export default darkModeSlice.reducer