import { createSlice } from '@reduxjs/toolkit';

export const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState: {
    value: {payload: null}
  },
  reducers: {
    changeLoggedInUser: (state, user) => {
        state.value = user
    }
  }
})

export const { changeLoggedInUser } = loggedInUserSlice.actions

export default loggedInUserSlice.reducer