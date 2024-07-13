import React from 'react';
import QuestionResultCard from './QuestionResultCard';

const QuestionResult = ({allAns,courseName,date,fullMark,level,mcqMark,semester,userId}) => {
  console.log(allAns);
  console.log(mcqMark);
  return (
    <div className="pb-10">
      <h3 className='bg-yellow-600 text-white text-3xl py-4 px-2 text-center'>ALL Answers</h3>
      {/*  start Questions answered   */}
      {/*  card 1  */}

         <div className="my-6 mx-auto w-full">
            <table className="table-auto w-full  border-collapse border border-slate-400 text-center">
               <thead>
                 <tr>
                   <th className="border border-slate-300 bg-yellow-800  p-2 text-2xl">Questions</th>
                   <th className="border border-slate-300 p-2 text-2xl bg-yellow-800 ">Answers</th>
                 </tr>
               </thead>
               {Object.entries(allAns).map(([key,value])=>{
                return <> 
                 <tbody>
                 <tr className='mt-4'>
                   <td className="border border-slate-300 py-4 px-2 ">Question {Number(key) + 1}</td>
                   <td className="border border-slate-300">{value}</td>
                 </tr>
               </tbody>
                </>
                     })}
               </table>
            </div>

    </div>
  );
};

export default QuestionResult;
