import TypeOfQuestion from "./TypeOfQuestion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
function AddAndDeleteBtn({
  Question,
  handleQuestionChange,
  mark,
  handleMarkChange,
  image,
  handleImageChange,
  questionType,
  handleSelectChange,
  // WrittenAnswer,
  // handleWrittenAnswerChange,
  handleMcqAnswers,
  mcqAnswers,
  allquestions,
  handleAllQuestions}) {
  const [questions, setQuestions] = useState([{ id: 1}]);
  const handleDelete = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
   
  };
  // console.log(questions);
  const handleAdd = (index) => {
    const newQuestions = [...questions];
    const lastQuestion = newQuestions[newQuestions.length - 1];
    const newQuestion = { id: lastQuestion?.id ? lastQuestion?.id + 1 : 1 };
    newQuestions.splice(index + 1, 0, newQuestion);
    setQuestions(newQuestions);
  };
  return (
    <div>
      {questions.map((question, index) => (
        <div key={question.id}> 
          <TypeOfQuestion
            id={question.id}
            onDelete={() => handleDelete(index)}
            question={Question}
            handleQuestionChange={handleQuestionChange}
            mark={mark}
            handleMarkChange={handleMarkChange}
            questionType={questionType}
            handleSelectChange={handleSelectChange}
            // image={image}
            // handleImageChange={handleImageChange}
            // WrittenAnswer={WrittenAnswer}
            // handleWrittenAnswerChange={handleWrittenAnswerChange}
            handleMcqAnswers={handleMcqAnswers}
            allquestions={allquestions}
            handleAllQuestions={handleAllQuestions}
          />
        </div>
      ))}
      <div className="relative flex-grow max-w-full flex-1 px-4 justify-end mb-5 add-question text-white" >
        add question
        <FontAwesomeIcon
          onClick={() => handleAdd(questions.length - 1)}
          icon={faCirclePlus}
          className="circle-plus mx-2"
        />
      </div>
    </div>
  );
}
export default AddAndDeleteBtn;