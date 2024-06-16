import { useQuery } from "@tanstack/react-query";
import Question from "../../layouts/question.component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResult } from "../../store/features/resultSlice";

function Quiz() {
  const [mixedData, setMixeddata] = useState([]);
  const dispatch = useDispatch();
  const { answersSelect } = useSelector((store: any) => store.allanswer);

  const { category, difficulty, question } = useSelector(
    (store: any) => store.apidata
  );

  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://opentdb.com/api.php?amount=" +
          question +
          "&category=" +
          category +
          "&difficulty=" +
          difficulty
      )
        .then((res) => res.json())
        .then((data) => data.results),
  });

  useEffect(() => {
    const copyData = data?.map((item: any) => {
      const copyItem = { ...item };
      const allAnswers = [
        copyItem.correct_answer,
        ...copyItem.incorrect_answers,
      ];

      for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
      }

      // copyItem.answers.map((item) => {
      //  item.iscorrect=null

      // });

      copyItem.answers = allAnswers;
      copyItem.isCorrect = null;

      return copyItem;
    });
    setMixeddata(copyData);
  }, [data]);

  useEffect(() => {
    if (data) {
      const correct = data.map((item: any) => item.correct_answer);
      setCorrectAnswers(correct);
    }
  }, [data]);
  console.log(correctAnswers);

  const getResult = () => {
    const copyMixedData: any = [...mixedData];
    correctAnswers.map((answer, index) => {
      if (answersSelect[index + 1] === answer) {
        dispatch(setResult(1));

        copyMixedData[index].isCorrect = true;
      } else if (answersSelect[index + 1] == undefined) {
        copyMixedData[index].isCorrect = undefined;
      } else if (answersSelect[index + 1] !== answer) {
        copyMixedData[index].isCorrect = false;
      }
    });
    setMixeddata(copyMixedData);
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="mx-auto my-0 bg-gradient-to-br w-full min-h-screen from-customPurple to-customYellow py-10 px-20 ">
      <h1 className="text-center text-3xl font-semibold text-white">Quiz</h1>
      <div>
        {mixedData &&
          mixedData?.map((item: any, i: number) => {
            return (
              <Question
                key={i + 1}
                answers={item.answers}
                question={item.question}
                isCorrect={item.isCorrect}
                correctAnswer={item.correct_answer}
                serialNumber={i + 1}
              />
            );
          })}
      </div>
      <div className="mx-auto my-0 justify-center flex">
        <button
          onClick={getResult}
          className="text-center rounded-lg text-xl text-white p-2 bg-blue-700 w-3/12"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Quiz;
