import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from 'src/shared/hooks/hookHTTP';

const initialState = {
  statusLoadingDataForAuthorsFilter: 'idle',
  statusLoadingDataForLocationsFilter: 'idle',
  dataAuthorsFilter: {},
  dataLocationsFilter: {},
  authorFilter: '',
  locationFilter: '',
  fromYearFilter: '',
  toYearFilter: '',
};

// Request to receive data for authors
export const fetchDataForAuthorsFilters = createAsyncThunk(
  'respdataforauthorsfilters/fetchDataForAuthorsFilters',
  async () => {
    const { request } = useHttp();
    return request(AddressesRequests.AUTHORS, 'GET', {
      'Content-Type': 'application/json',
    });
  },
);
// Request to receive data for locations
export const fetchDataForLocationsFiletrs = createAsyncThunk(
  'respdataforlocationsfilters/fetchDataForLocationsFiletrs',
  async () => {
    const { request } = useHttp();
    return request(AddressesRequests.LOCATIONS, 'GET', {
      'Content-Type': 'application/json',
    });
  },
);

// Getting data for list of paintings
const respDataForFilter = createSlice({
  name: 'respdataforfilter',
  initialState,
  reducers: {
    changeAuthorFilter: (state, action) => {
      state.authorFilter = action.payload;
    },
    changeLocationFilter: (state, action) => {
      state.locationFilter = action.payload;
    },
    changeFromYearFilter: (state, action) => {
      state.fromYearFilter = action.payload;
    },
    changeToYearFilter: (state, action) => {
      state.toYearFilter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDataForAuthorsFilters.pending, state => {
        state.statusLoadingDataForAuthorsFilter = 'idle';
      })
      .addCase(fetchDataForAuthorsFilters.fulfilled, (state, action) => {
        state.statusLoadingDataForAuthorsFilter = 'loaded';
        state.dataAuthorsFilter = action.payload!;
      })
      .addCase(fetchDataForAuthorsFilters.rejected, state => {
        state.statusLoadingDataForAuthorsFilter = 'error';
      })
      .addCase(fetchDataForLocationsFiletrs.pending, state => {
        state.statusLoadingDataForLocationsFilter = 'idle';
      })
      .addCase(fetchDataForLocationsFiletrs.fulfilled, (state, action) => {
        state.statusLoadingDataForLocationsFilter = 'loaded';
        state.dataLocationsFilter = action.payload!;
      })
      .addCase(fetchDataForLocationsFiletrs.rejected, state => {
        state.statusLoadingDataForLocationsFilter = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = respDataForFilter;
export const {
  changeAuthorFilter,
  changeLocationFilter,
  changeFromYearFilter,
  changeToYearFilter,
} = actions;
export default reducer;
