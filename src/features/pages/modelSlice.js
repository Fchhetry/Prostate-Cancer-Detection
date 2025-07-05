import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchModels = createAsyncThunk("models/fetchModels", async () => {
  const res = await axios.get("http://localhost:3001/api/models");
  return res.data;
});

export const fetchModelDetails = createAsyncThunk(
  "models/fetchModelDetails",
  async (modelName) => {
    const res = await axios.get(
      `http://localhost:3001/api/models/${modelName}`
    );
    return res.data;
  }
);

const modelSlice = createSlice({
  name: "models",
  initialState: {
    modelList: [],
    model1Data: null,
    model2Data: null,
  },
  reducers: {
    setModel1Data(state, action) {
      state.model1Data = action.payload;
    },
    setModel2Data(state, action) {
      state.model2Data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModels.fulfilled, (state, action) => {
      state.modelList = action.payload;
    });
  },
});

export const { setModel1Data, setModel2Data } = modelSlice.actions;
export default modelSlice.reducer;
