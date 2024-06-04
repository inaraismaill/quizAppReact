type questionI = {
  answers: any;
  question: any;
  correct: any;
  serialNumber: number;
};

function Question({ answers, question, correct, serialNumber }: questionI) {
  
  return (
    <div  className="bg-white-39 rounded-xl p-3 my-10 mx-20">
      <div className=" ">
        <h3 className="text-2xl backdrop-blur-none">
          <span>{serialNumber}</span> {question}
        </h3>
      </div>
      <form className="quizForm">
        {answers.map((item: any) => (
          <div key={item} className="w-full text-xl my-3 text-white">
            <input type="radio" id={item} name="answer" defaultValue={item} />
            <label htmlFor={item} className=" w-full font-bold p-1 pl-3">
              {item}
            </label>
          </div>
        ))}
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
}

export default Question;
