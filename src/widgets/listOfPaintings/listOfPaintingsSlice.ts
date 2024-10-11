import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useHttp, { AddressesRequests } from 'src/shared/hooks/hookHTTP';

const initialState = {
  statusLoadingDataForListOfPaintings: 'idle',
  statusLoadingDataForAuthors: 'idle',
  statusLoadingDataForLocations: 'idle',
  dataListOfPaintings: {},
  dataAuthors: {},
  dataLocations: {},
};

// Request to receive data for list of paintings
export const fetchDataForListOfPaintings = createAsyncThunk(
  'respdataforlistofpaintings/DataForListOfPaintings',
  async (value: string) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.PAINTINGS,
      'GET',
      {
        'Content-Type': 'application/json',
      },
      undefined,
      value,
    );
  },
);
// Request to receive data for authors
export const fetchDataForAuthors = createAsyncThunk(
  'respdataforauthors/fetchDataForAuthors',
  async (value: string) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.AUTHORS,
      'GET',
      {
        'Content-Type': 'application/json',
      },
      undefined,
      value,
    );
  },
);
// Request to receive data for locations
export const fetchDataForLocations = createAsyncThunk(
  'respdataforlocations/fetchDataForLocations',
  async (value: string) => {
    const { request } = useHttp();
    return request(
      AddressesRequests.LOCATIONS,
      'GET',
      {
        'Content-Type': 'application/json',
      },
      undefined,
      value,
    );
  },
);

// Getting data for list of paintings
const respDataForListOfPaintings = createSlice({
  name: 'respdataforlistofpaintings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDataForListOfPaintings.pending, state => {
        state.statusLoadingDataForListOfPaintings = 'idle';
      })
      .addCase(fetchDataForListOfPaintings.fulfilled, (state, action) => {
        state.statusLoadingDataForListOfPaintings = 'loaded';
        state.dataListOfPaintings = action.payload!;
      })
      .addCase(fetchDataForListOfPaintings.rejected, state => {
        state.statusLoadingDataForListOfPaintings = 'error';
      })
      .addCase(fetchDataForAuthors.pending, state => {
        state.statusLoadingDataForAuthors = 'idle';
      })
      .addCase(fetchDataForAuthors.fulfilled, (state, action) => {
        state.statusLoadingDataForAuthors = 'loaded';
        state.dataAuthors = action.payload!;
      })
      .addCase(fetchDataForAuthors.rejected, state => {
        state.statusLoadingDataForAuthors = 'error';
      })
      .addCase(fetchDataForLocations.pending, state => {
        state.statusLoadingDataForLocations = 'idle';
      })
      .addCase(fetchDataForLocations.fulfilled, (state, action) => {
        state.statusLoadingDataForLocations = 'loaded';
        state.dataLocations = action.payload!;
      })
      .addCase(fetchDataForLocations.rejected, state => {
        state.statusLoadingDataForLocations = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = respDataForListOfPaintings;
// export const {} = actions;
export default reducer;
