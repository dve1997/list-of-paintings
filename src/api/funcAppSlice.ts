/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: false,
  filter: false,
  animationCard: false,
  index: 0,
  quantitySlides: 0,
  fieldArtist: false,
  fieldLocation: false,
  fieldYears: false,
  artist: false,
  location: false,
  years: false,
  filterAuthor: '',
  filterLoc: '',
  filterYearFrom: '',
  filterYearTo: '',
  searchValue: '',
};

const funcAppSlice = createSlice({
  name: 'funcApp',
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
    updateAnimationCard: (state, action) => {
      state.animationCard = action.payload;
    },
    updateIndex: (state, action) => {
      state.index = action.payload;
    },
    updateQuantitySlides: (state, action) => {
      state.quantitySlides = action.payload;
    },
    updateFieldArtist: (state, action) => {
      state.fieldArtist = action.payload;
    },
    updateFieldLocation: (state, action) => {
      state.fieldLocation = action.payload;
    },
    updateFieldYears: (state, action) => {
      state.fieldYears = action.payload;
    },
    updateArtist: (state, action) => {
      state.artist = action.payload;
    },
    updateLocation: (state, action) => {
      state.location = action.payload;
    },
    updateYears: (state, action) => {
      state.years = action.payload;
    },
    updateFilterAuthor: (state, action) => {
      state.filterAuthor = action.payload;
    },
    updateFilterLoc: (state, action) => {
      state.filterLoc = action.payload;
    },
    updateFilterYearFrom: (state, action) => {
      state.filterYearFrom = action.payload;
    },
    updateFilterYearTo: (state, action) => {
      state.filterYearTo = action.payload;
    },
    updateTumblerSearchOfFilters: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

const { actions, reducer } = funcAppSlice;
export default reducer;
export const {
  updateTheme,
  updateFilter,
  updateAnimationCard,
  updateIndex,
  updateQuantitySlides,
  updateFieldArtist,
  updateFieldLocation,
  updateFieldYears,
  updateArtist,
  updateLocation,
  updateYears,
  updateFilterAuthor,
  updateFilterLoc,
  updateFilterYearFrom,
  updateFilterYearTo,
  updateTumblerSearchOfFilters,
} = actions;
