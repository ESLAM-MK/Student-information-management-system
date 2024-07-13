import React from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import mystore from "./redux/store";
import StudentHome from "./Screens/Student/Home";
import FacultyHome from "./Screens/Faculty/Home";
import AdminHome from "./Screens/Admin/Home";

// exam 
import ExamResultPage from './Pages/ExamPages/ExamResult/ExamResultPage';
import CreateNewExamPage from './Pages/ExamPages/CreateNewExamPage/CreateNewExamPage';
import OnlineExamPage from './Pages/ExamPages/OnlineExamPage/OnlineExamPage';
import UpComingExamPagea from './Pages/ExamPages/UpComingExamPagea/UpComingExamPagea';
import UpdateExamPage from './Pages/ExamPages/UpdateExamPage/UpdateExamPage';
function App() {
  return (
    <>
    <Provider store={mystore}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="student" element={<StudentHome />} />
            <Route path="faculty" element={<FacultyHome />} />
            <Route path="admin" element={<AdminHome />} />
             {/* Exam Page */}
          <Route
            path="/examresult/:id/:courseName/:fullMark/:date"
            element={
              <>
                <ExamResultPage />
              </>
            }
          />
          <Route
            path="/faculty/createexam"
            element={
              <>
                <CreateNewExamPage />
              </>
            }
          />
          <Route
            path="/updateexam/:id"
            element={
              <>
                <UpdateExamPage />
              </>
            }
          />
          <Route
            path="/student/:courseName/:date/:duration/:time/:level/:fullMark/:semester/:id"
            element={
              <>
                <OnlineExamPage />
              </>
            }
          />
          <Route
            path="/upcomingexam"
            element={
              <>
                <UpComingExamPagea />
              </>
            }
          />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
