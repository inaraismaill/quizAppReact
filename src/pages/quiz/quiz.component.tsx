import { useQuery } from "@tanstack/react-query";
import Question from "../../layouts/question.component";
import { useEffect, useState } from "react";

function Quiz() {
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://opentdb.com/api.php?amount=10&category=23")
        .then((res) => res.json())
        .then((data) => data.results),
  });

  const mixAnswers = (correct_answer: string, incorrect_answers: any) => {
    const allAnswers = [correct_answer, ...incorrect_answers];

    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }

    return allAnswers;
  };

  // const getCorrectAnswers = (correct_answer:any) => {
  //   setCorrectAnswers([...correctAnswers,correct_answer]);
  //   console.log(correctAnswers)
  // };

  useEffect(() => {
    if (data) {
      const correct = data.map((item: any) => item.correct_answer);
      setCorrectAnswers(correct);
    }
  }, [data]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  
  return (
    <div className="mx-auto my-0 bg-gradient-to-br w-full min-h-screen from-customPurple to-customYellow py-10 px-20 ">
      <h1 className="text-center text-3xl font-semibold text-white">Quiz</h1>
      {data &&
        data?.map((item: any, i: number) => {
          const answers = mixAnswers(
            item.correct_answer,
            item.incorrect_answers
          );
          return (
            <Question
              key={i+1}
              answers={answers}
              question={item.question}
              correct={item.correct_answer}
              serialNumber={i + 1}
            />
          );
        })}
      <div className="mx-auto my-0 justify-center flex">
        <button className="text-center rounded-lg text-xl text-white p-2 bg-blue-700 w-3/12">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Quiz;
