import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ApidataState {
  question: number;
  category: string;
  difficulty: string;
}

const initialState: ApidataState = {
  question: 3,
  category: "10",
  difficulty: "easy",
};

export const apidataSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setQuestion: (state: ApidataState, action: PayloadAction<number>) => {
      state.question = action.payload;
    },
    setCategory: (state: ApidataState, action:  PayloadAction<string>) => {
      if (action.payload == "book") {
        state.category = "10";
      } else if (action.payload == "films") {
        state.category = "11";
      } else if (action.payload == "history") {
        state.category = "23";
      }
    },
    setDifficulty: (state: ApidataState, action: PayloadAction<string>) => {
      state.difficulty = action.payload;
    },
  },
});

export const { setQuestion, setDifficulty, setCategory } = apidataSlice.actions;

export default apidataSlice.reducer;
