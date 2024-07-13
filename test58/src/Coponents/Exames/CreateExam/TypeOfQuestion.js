import McqQuestion from './McqQuestion';
import WrittenQuestion from './WrittenQuestion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function TypeOfQuestion({ id,allquestions,handleAllQuestions, onDelete,  hideDeleteButton ,question , handleQuestionChange ,mark , handleMarkChange,
  image, handleImageChange,questionType,handleMcqAnswers, handleSelectChange }) {
  return (
    <div className="flex flex-wrap  question-form">
      <div className="lg:w-4/5 pr-4 pl-4 form-info mb-3 ">
        <form>
          <div className="flex flex-wrap ">
            <div className="mb-4 md:w-2/3 pr-4 pl-4 mb-3">
              <label htmlFor="inputEmail4" className="form-label">
                question {id}
              </label>
              <input type="text" className="block text-white appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" id="inputText0" required  onChange={(e)=>handleQuestionChange(e,id)} ></input>
            </div>
            <div className="mb-4 md:w-1/3 pr-4 pl-4 mb-3">
              <label htmlFor="inputPassword4" className="form-label">
                mark
              </label>
              <input type="text" className="block text-white appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" id="inputText1" required onChange={(e)=>handleMarkChange(e,id)}  ></input>
            </div>
          </div>
          <div className="flex flex-wrap ">
            <div className="mb-4 md:w-2/5 pr-4 pl-4 mb-3">
              <label htmlFor="inputEmail4" className="form-label">
                question type
              </label>
              <select
                className="form-select form-select-sm"
                id="sec-select"
                aria-label=".form-select-sm example"
                required
                onChange={(e)=>handleSelectChange(e,id)}
             
              >
                <option  selected disabled hidden>select Type Of Question</option>
                <option  value="mcq">Mcq Question</option>
                <option value="written">Written Question</option>
              </select>
            </div>
            {/* <div className="mb-4 md:w-3/5 pr-4 pl-4 mb-3 relative">
              <label htmlFor="inputPassword4" className="form-label">
                image upload
              </label>
              <input type="file" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" id="inputfile4" required  onChange={(e)=>handleImageChange(e)} ></input>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cloud-arrow-down"
                viewBox="0 0 16 16"
                id="svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"
                />
                <path
                  d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
                />
              </svg>
            </div> */}
          </div>
          {<McqQuestion  handleMcqAnswers={handleMcqAnswers}  id={id}/>}
        </form>
      </div>
      {/* {!hideDeleteButton && (
        <div className="md:w-1/5 pr-4 pl-4 " onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashCan} className='del-quistion' />
        </div>
      )} */}
    </div>
  );
}
export default TypeOfQuestion;