import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  setCategory,
  setDifficulty,
  setQuestion,
} from "../../store/features/apidataSlice";

type typeForm = {
  question: number;
  category: string;
  difficulty: string;
};
function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { register, handleSubmit, formState } = useForm<typeForm>({});
  const { errors } = formState;

  // const getQuestions = (e: any) => {
  //   e.preventDefault();
  //   navigation("/quiz");
  // };

  const onSubmit = (data: typeForm) => {
    dispatch(setDifficulty(data.difficulty));
    dispatch(setCategory(data.category));
    dispatch(setQuestion(data.question));
    navigation("/quiz");
  };

  return (
    <div className="mx- h-100 my-0 bg-gradient-to-br w-full min-h-screen from-customPurple to-customYellow py-5 px-20   ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white-39 rounded-xl p-3 my-10 mx-5">
          <label>
            Number of Questions (max:50):
            <input
              {...register("question", {
                valueAsNumber: true,
                validate: {
                  check: (value) => {
                    return value <= 50 || "max number 50";
                  },
                },
              })}
              // onChange={(e) => {
              //   question(e);
              // }}
              min="1"
              max="50"
              type="number"
              defaultValue={3}
              className="rounded-lg  p-1 mx-4"
            />
          </label>
        </div>
        <p className="text-red-600"> {errors.question?.message}</p>
        <div className="bg-white-39 rounded-xl p-3 my-10 mx-5">
          <label htmlFor="category" className="rounded-lg">
            Select Category:
          </label>
          <select
            // onChange={(e) => {
            //   dispatch(setCategory(e.target.value));
            // }}

            {...register("category", { required: "Category is required" })}
            className="rounded-lg p-1 mx-4"
            id="category"
          >
            <option value="book">book</option>
            <option value="history">history</option>
            <option value="films">films</option>
          </select>
        </div>
        <div className="bg-white-39 rounded-xl p-3 my-10 mx-5">
          <label htmlFor="category">Select Difficulty:</label>
          <select
            // onChange={(e) => {
            //   dispatch(setDifficulty(e.target.value));
            // }}

            {...register("difficulty", { required: "Category is required" })}
            className="rounded-lg p-1 mx-4"
            id="difficuluty"
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        <button
        type="submit"
        className="p-3 text-center w-full rounded-lg bg-black text-white"
      >
        GetQuestion
      </button>
      </form>
     
    </div>
  );
}

export default Home;
