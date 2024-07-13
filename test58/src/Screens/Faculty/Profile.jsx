import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { baseApiURL } from "../../baseUrl";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/${router.state.type}/details/getDetails`,
        { employeeId: router.state.loginid },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
              employeeId: response.data.user[0].employeeId,
              department:response.data.user[0].department,
              subject:response.data.user[0].subject,
              semester:response.data.user[0].semester
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router.state.loginid, router.state.type]);
  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/faculty/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/faculty/auth/update/${id}`,
        { loginid: router.state.loginid, password: password.new },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };
  return (
    <div className="w-[85%] mx-auto my-8 flex justify-between items-start">
      {data && (
        <>
          <div>
            <p className="text-2xl font-bold mb-10 text-yellow-500 ">
              Hello {data[0].firstName} {data[0].middleName} {data[0].lastName}{" "}
              👋
            </p>
            <div className="mt-3">
              <p className="text-lg text-yellow-500 font-normal mb-4">
                Employee Id: <span className="bg-gray-600 ml-2 text-white py-1 px-2 rounded">{data[0].employeeId} </span>
              </p>
            
              <p className="text-lg text-yellow-500 font-normal mb-4">
                Email Id:  <span className="bg-gray-600 ml-2 text-white py-1 px-2 rounded">{data[0].email} </span>
              </p>
              <p className="text-lg text-yellow-500 font-normal mb-4">
                Phone Number:  <span className="bg-gray-600 ml-2 text-white py-1 px-2 rounded">{data[0].phoneNumber} </span>
              </p>
              <p className="text-lg text-yellow-500 font-normal mb-4">
                Department:  <span className="bg-gray-600 ml-2 text-white py-1 px-2 rounded">{data[0].department} </span>
              </p>
               <p className="text-lg text-yellow-500 font-normal mb-4">
                Subject:  <span className="bg-gray-600 ml-2 text-white py-1 px-2 rounded">{data[0].subject} </span>
              </p>
              <p className="text-lg text-yellow-500 font-normal mb-4">
                Year:  <span className="bg-gray-600 ml-2 text-white py-1 px-2 rounded">{data[0].semester} </span>
              </p>
            </div>
            <button
              className={`${
                showPass ? "bg-red-100 text-red-600" : "bg-gray-800 text-white"
              }  px-3 py-1 rounded mt-4`}
              onClick={() => setShowPass(!showPass)}
            >
              {!showPass ? "Change Password" : "Close Change Password"}
            </button>
         
            {showPass && (
              <form
                className="mt-4 border-t-2 border-blue-500 flex flex-col justify-center items-start"
                onSubmit={checkPasswordHandler}
              >
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) =>
                    setPassword({ ...password, current: e.target.value })
                  }
                  placeholder="Current Password"
                  className="px-3 py-1 border-2 bg-gray-800 placeholder-gray-400 text-white outline-none rounded mt-4"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                  placeholder="New Password"
                  className="px-3 py-1 border-2 bg-gray-800 placeholder-gray-400 text-white outline-none rounded mt-4"
                />
                <button
                  className="mt-4  bg-green-400 px-3 py-1 rounded text-green-800 mb-2"
                  onClick={checkPasswordHandler}
                  type="submit"
                >
                  Change Password
                </button>
             
              </form>
            )}
          </div>
          <img
            src={data[0].profile}
            alt="faculty profile"
            className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
          />
        </>
      )}
    </div>
  );
};

export default Profile;
