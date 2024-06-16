import { useDispatch, useSelector } from "react-redux";
import { addNewAnswer } from "../store/features/answersSlice";

type questionI = {
  answers: [];
  question: string;
  serialNumber: number;
  isCorrect: boolean | null | undefined;
  correctAnswer: string;
};

function Question({
  answers,
  question,
  serialNumber,
  isCorrect,
  correctAnswer,
}: questionI) {
  const dispatch = useDispatch();

  const { answersSelect } = useSelector((store: any) => store.allanswer);

  const getAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const myvalue = e.target.value;
    dispatch(addNewAnswer({ serialNumber, myvalue }));
  };
  console.log(isCorrect);

  const check = (item: any) => {
    if (isCorrect === null) {
      return "";
    } else if (isCorrect == undefined) {
      return "bg-slate-700";
    } else if (
      correctAnswer == item &&
      (isCorrect == true || isCorrect == false)
    ) {
      return "bg-lime-600";
    } else if (answersSelect[serialNumber] == item && isCorrect == false) {
      return "bg-red-600";
    }
  };

  return (
    <div className="bg-white-39 rounded-xl p-3 my-10 mx-20">
      <div className="">
        <h3 className="text-2xl backdrop-blur-none">
          <span>{serialNumber}</span> {question}
        </h3>
      </div>
      <form className="quizForm" onChange={(e:any) => getAnswer(e)}>
        {answers.map((item: any) => (
          <div key={item} className="w-full p-2 text-xl my-3 text-white">
            <label
              className={`w-full font-bold p-1 pl-3 rounded-xl ${check(item)}`}
            >
              <input
                disabled={isCorrect != null }
                type="radio"
                name="answer"
                value={item}
              />
              {item}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}

export default Question;
