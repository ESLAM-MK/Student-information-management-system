import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { baseApiURL } from "../../baseUrl";

const AllExams = () => {
  const dispatch = useDispatch();
  const [examAns, setExamAns] = useState([]);
  const userData = useSelector(state => state.userData);
  const { semester, department: branch, subject } = userData;
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const [load, setLoad] = useState(true);

  const examFilter = examAns.filter(e => e.courseName === subject && e.level === branch);

  useEffect(() => {
    axios
      .get(`${baseApiURL()}/Exams/getExamsAns${semester}`)
      .then(response => {
        setExamAns(response.data.examFilter);
      })
      .catch(error => {
        toast.dismiss();
        toast.error(error.message);
      });
  }, [dispatch, semester]);

  return (
    <section>
      <div className="my-6 mx-auto w-full">
        <div className="mb-10">
          <h2 className="text-center bg-green-800 p-4 font-bold text-white text-2xl">
            All Exams Answers
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-slate-400 text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2 text-yellow-800">Student Id</th>
                  <th className="border border-slate-300 p-2 text-yellow-800">Branch</th>
                  <th className="border border-slate-300 p-2 text-yellow-800">Subject</th>
                  <th className="border border-slate-300 p-2 text-yellow-800">MCQ Marks</th>
                  <th className="border border-slate-300 p-2 text-yellow-800">All Answers</th>
                  <th className="border border-slate-300 p-2 text-yellow-800">Full Marks</th>
                  <th className="border border-slate-300 p-2 text-yellow-800">Date</th>
                </tr>
              </thead>
              <tbody>
                {examFilter.map(e => (
                  <tr key={e.userId}>
                    <td className="border border-slate-300 text-yellow-500">{e.userId}</td>
                    <td className="border border-slate-300 text-yellow-500">{e.level}</td>
                    <td className="border border-slate-300 text-yellow-500">{e.courseName}</td>
                    <td className="border border-slate-300 text-yellow-500">{e.mcqMark}</td>
                    <td className="border border-slate-300 text-yellow-500">
                      {Object.entries(e.allAns).map(([key, value], index) => (
                        <p key={index}>{Number(key) + 1} &rarr; <span className="text-red-600">{value}</span></p>
                      ))}
                    </td>
                    <td className="border border-slate-300 text-yellow-500">{e.fullMark}</td>
                    <td className="border border-slate-300 text-yellow-500">{e.date.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllExams;
