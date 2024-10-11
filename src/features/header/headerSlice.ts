import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeApp: false,
};

// Application theme switching slice
const respDataBaner = createSlice({
  name: 'respdatabaner',
  initialState,
  reducers: {
    changeThemeApp: (state, action) => {
      state.themeApp = action.payload;
    },
  },
});

const { actions, reducer } = respDataBaner;
export const { changeThemeApp } = actions;
export default reducer;
