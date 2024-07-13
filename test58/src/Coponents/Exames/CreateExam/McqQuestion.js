import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function McqQuestion({handleMcqAnswers,id}) {
  const [mcqAnswer, setmcqAnswer] = useState([
    { id: 0, value: '', isCorrect: false },
  ]);


  const addOption = () => {
    setmcqAnswer([
      ...mcqAnswer,
      { id: mcqAnswer.length, value: '', isCorrect: false },
    ]);
  };

  const removeOption = (id) => {
    setmcqAnswer(mcqAnswer.filter((option) => option.id !== id));
  };

  const handleOptionChange = (event , id, value ) => {      
    event.preventDefault();
    setmcqAnswer(
      mcqAnswer.map((option) =>
        option.id === id ? { ...option, value } : option
      )
    );
  };

  const handleCorrectChange = (event,  id, isCorrect) => {
    event.preventDefault();
      setmcqAnswer(
          mcqAnswer.map((option) =>
          option.id === id ? { ...option, isCorrect } : option
          )
          );
  };
  useEffect(() => {
    handleMcqAnswers(mcqAnswer,id)
  }, [mcqAnswer]);
      return (
        <>
  { mcqAnswer.map((option) => (
    <div key={option.id} className='flex flex-wrap  '>
    <div className="mb-4 md:w-3/5 pr-4 pl-4  relative " key={option.id}>
      <div className="flex justify-between w-full">
        <label htmlFor={`inputText${option.id}`} className="form-label">
          option
        </label>
        <span className=" md:hidden " ><FontAwesomeIcon onClick={() => removeOption(option.id)} icon={faTrashCan} className="" /></span>
      </div>
      <input
        type="text"
        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white  border border-gray-200 rounded"
        id={`inputText${option.id}`}
       
        onChange={(event) => handleOptionChange(event, option.id, event.target.value)}
        
      />
      {mcqAnswer.length >= 1 && (
        <button
          className={`${
            option.isCorrect ? 'correct-button' : 'wrong-button'
          }`}
          onClick={(event) => handleCorrectChange(event ,  option.id, !option.isCorrect )}
        >
          <FontAwesomeIcon
            icon={option.isCorrect ? faCircleCheck : faCircleXmark}
            className="mt-1"
          />
          <span className=""> {option.isCorrect ? 'Correct' : 'Wrong'} answer </span>
        </button>
      )}
    </div>
      <div className=" md:w-1/5 pr-4 pl-4 mb-3 flex items-center	">
                    <label for="inputPassword2" className="form-label "></label>
                    <div className=" md:flex hidden justify-end md:justify-start" ><FontAwesomeIcon onClick={() => removeOption(option.id)} icon={faTrashCan} className=' md:mt-4 mt-0' /></div>
                </div>
    </div>
    
  ))}
      <div className=" w-full lg:w-2/3 pr-4 pl-4 can-pluse mb-3 justify-end ">
        <label htmlFor="inputPassword4" className="form-label"></label>
        <FontAwesomeIcon
          icon={faCirclePlus}
          className="circle-plus "
          onClick={addOption}
        />
      </div>
    </>
  );
}
export default McqQuestion;
