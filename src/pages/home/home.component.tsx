import { useNavigate } from "react-router-dom";

function Home() {

  const navigation = useNavigate();

  const getQuestions = (e:any) => {
    navigation("/quiz");
    e.preventDefault();
  };

  return (
    <div className="w-1/4 mx-auto my-0">
      <button
        className="p-3 text-center w-full bg-black text-white"
        onClick={getQuestions}
      >
        GetQuestion
      </button>
    </div>
  );
}

export default Home;
