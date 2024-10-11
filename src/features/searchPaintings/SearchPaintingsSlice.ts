import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchPaintings: '',
};

// Application theme switching slice
const respDataSearchPaintings = createSlice({
  name: 'respdatasearchpaintings',
  initialState,
  reducers: {
    changeSearchPainting: (state, action) => {
      state.searchPaintings = action.payload;
    },
  },
});

const { actions, reducer } = respDataSearchPaintings;
export const { changeSearchPainting } = actions;
export default reducer;
