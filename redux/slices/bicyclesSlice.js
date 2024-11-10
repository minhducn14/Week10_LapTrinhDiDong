import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://670b38d1ac6860a6c2cb7013.mockapi.io/bicycle';

export const fetchBikes = createAsyncThunk(
  'bicycles/fetchBikes',
  async (category) => {
    let apiUrl = API_URL;
    if (category) {
      apiUrl += `?category=${category}`;
    }
    const response = await axios.get(apiUrl);
    return response.data;
  }
);

export const addBicycle = createAsyncThunk(
  'bicycles/addBicycle',
  async (newBicycle) => {
    const response = await axios.post(API_URL, newBicycle);
    return response.data;
  }
);

export const fetchBicycleById = createAsyncThunk(
  'bicycles/fetchBicycleById',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

const bicyclesSlice = createSlice({
  name: 'bicycles',
  initialState: {
    data: [], 
    loading: false, 
    error: null, 
    selectedCategory: '',
    bicycleDetail: null, 
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addBicycle.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addBicycle.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(fetchBicycleById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.bicycleDetail = null; 
      })
      .addCase(fetchBicycleById.fulfilled, (state, action) => {
        state.loading = false;
        state.bicycleDetail = action.payload;
      })
      .addCase(fetchBicycleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory } = bicyclesSlice.actions;
export default bicyclesSlice.reducer;
