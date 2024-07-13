import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
function WrittenQuestion({WrittenAnswer ,handleWrittenAnswerChange,id }) {
    return (
        <>
            <div className="flex flex-wrap ">
                <div className="mb-4 md:w-full pr-4 pl-4 mb-3 relative">
                    <label for="inputEmail5" className="form-label">answer</label>
                    <input type="text" className="block appearance-none w-full py-1 px-2 mb-1  text-base leading-normal bg-white  border border-gray-200 rounded" id="inputText6"required  onChange={(e)=>handleWrittenAnswerChange(e,id)} ></input>
                    <button className="correct-button "> <FontAwesomeIcon icon={faCircleCheck} className='mt-1' /> <span className=''> Correct answer </span></button>
                </div>
                <div className=" md:w-1/4 pr-4 pl-4" id="undefined">
                    <label></label>
                </div>
            </div>

        </>
    )
}

export default WrittenQuestion