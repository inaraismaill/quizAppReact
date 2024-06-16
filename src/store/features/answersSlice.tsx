import { createSlice } from "@reduxjs/toolkit";

interface answertype {
  key: number;
  value: string;
}
interface AnswersState {
  answersSelect: answertype[];
}
const initialState: AnswersState = {
  answersSelect: [],
};

export const AnswersSlice = createSlice({
  name: "Answers",
  initialState,
  reducers: {
    addNewAnswer: (state, action) => {
      const { serialNumber, myvalue } = action.payload;
      state.answersSelect[serialNumber] = myvalue;
    },
    removeNewAnswer: (state, action) => {
      state.answersSelect = state.answersSelect.filter(
        (item) => item.key !== action.payload
      );
    }
  },
});

export const { addNewAnswer, removeNewAnswer } =AnswersSlice.actions;

// export const selectAnswers = (state: RootState) => state.Answers.answers;

export default AnswersSlice.reducer;
