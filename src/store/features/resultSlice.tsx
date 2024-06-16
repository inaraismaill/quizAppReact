import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ResultState {
  value: number;
}

const initialState: ResultState = {
  value: 0,
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setResult: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { setResult } = resultSlice.actions;

export default resultSlice.reducer;
