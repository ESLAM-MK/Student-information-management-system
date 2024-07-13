// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FiLogIn } from "react-icons/fi";
// import axios from "axios";
// import img_helwan from "../images/273178808_1359895081128233_55771399475757040668_n.jpg"
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { baseApiURL } from "../baseUrl";
// const Login = () => {
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState("Student");
//   const { register, handleSubmit } = useForm();
//   const onSubmit = (data) => {
//     if (data.login !== "" && data.password !== "") {
//       const headers = {
//         "Content-Type": "application/json",
//       };
//       axios
//         .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
//           headers: headers,
//         })
//         .then((response) => {
          
//           if(selected === "Student"){
//             navigate(`/${selected.toLowerCase()}`, {
//               state: { type: selected, loginid: response.data.enrollmentNo },
//             });
//           }else{
//             navigate(`/${selected.toLowerCase()}`, {
//               state: { type: selected, loginid: response.data.loginid },
//             });
//           }
        
//         })
//         .catch((error) => {
          
//           toast.dismiss();
//           console.error(error);
//           toast.error("Wrong username or password");
          
//         });
//     } 
//   };
//   return (
//     <div className=" bg-white bg-no-repeat bg-cover h-[100vh]  w-full flex flex-col justify-between items-end pt-60 "
//     style={{backgroundImage: "url("+img_helwan +")"}}>
//       {/* <img
//         className="w-[60%] h-[100vh] object-cover"
//         src= {img_helwan}
//         alt=""
//       /> */}
//       <div className="w-[40%] flex justify-center items-start flex-col pl-8">
//         <p className="text-3xl text-gray-700 font-semibold pb-2 border-b-2 border-green-500">
//           {(selected==="Faculty"?"Staff": "No " && selected)}
//           &nbsp;Login
//         </p>
//         <form
//           className="flex justify-center  items-start flex-col w-full mt-10"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <div className="flex flex-col text-gray-700 w-[70%]">
//             <label className="mb-1" htmlFor="eno">
              
//             </label>
//             <input
//               type="number"
//               id="eno"
//               placeholder="LoginId"
//               required
//               className="bg-white outline-none text-gray-700 border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
//               {...register("loginid")}
//             />
//           </div>
//           <div className="flex flex-col text-gray-800  w-[70%] mt-3">
          
//             <input
//               type="password"
//               id="password"
//               placeholder="Password"
//               required
//               className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
//               {...register("password")}
//             />
//           </div>
//           {/* <div className="flex w-[70%] mt-3 justify-start items-center">
//             <input type="checkbox" id="remember" className="accent-blue-500" />{" "}
//             Remember Me
//           </div> */}
//           <button className=" mt-5 text-white bg-gray-900 px-6 py-2 text-xl rounded-md hover:bg-gray-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
//             Login
//             <span className="ml-2">
//               <FiLogIn />
//             </span>
//           </button>
//         </form>
//       </div>
//       <div className="absolute top-4 right-4">
//         <button
//           className={`text-gray-800 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//             selected === "Student" && "border-b-2 border-green-500"
//           }`}
//           onClick={() => setSelected("Student")}
//         >
//           Student
//         </button>
//         <button
//           className={`text-gray-800 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//             selected === "Faculty" && "border-b-2 border-green-500"
//           }`}
//           onClick={() => setSelected("Faculty")}
//         >
//           {/* Faculty */}
//           Staff
//         </button>
//         <button
//           className={`text-gray-800 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//             selected === "Admin" && "border-b-2 border-green-500"
//           }`}
//           onClick={() => setSelected("Admin")}
//         >
//           Admin
//         </button>
//       </div>
//       <Toaster position="bottom-center" />
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import img_helwan from "../images/273178808_1359895081128233_55771399475757040668_n.jpg";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.login !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
        .then((response) => {
          if (selected === "Student") {
            navigate(`/${selected.toLowerCase()}`, {
              state: { type: selected, loginid: response.data.enrollmentNo },
            });
          } else {
            navigate(`/${selected.toLowerCase()}`, {
              state: { type: selected, loginid: response.data.loginid },
            });
          }
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error("Wrong username or password");
        });
    }
  };

  return (
    <div
      className="bg-white bg-no-repeat bg-cover min-h-screen flex flex-col justify-center items-center sm:items-end p-6"
      style={{ backgroundImage: "url(" + img_helwan + ")" }}
    >
      <div className="w-full sm:w-[40%] flex justify-center items-start flex-col pl-8">
        <p className="text-3xl text-gray-700 font-semibold pb-2 border-b-2 border-green-500">
          {selected === "Faculty" ? "Staff" : "No " && selected}
          &nbsp;Login
        </p>
        <form
          className="flex justify-center items-start flex-col w-full mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col text-gray-700 w-full sm:w-[70%]">
            <label className="mb-1" htmlFor="eno"></label>
            <input
              type="number"
              id="eno"
              placeholder="LoginId"
              required
              className="bg-white outline-none text-gray-700 border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("loginid")}
            />
          </div>
          <div className="flex flex-col text-gray-800 w-full sm:w-[70%] mt-3">
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("password")}
            />
          </div>
          <button className="mt-5 text-white bg-gray-900 px-6 py-2 text-xl rounded-md hover:bg-gray-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
            Login
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
      </div>
      <div className="absolute top-4 right-4 flex space-x-6">
        <button
          className={`text-gray-800 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
            selected === "Student" && "border-b-2 border-green-500"
          }`}
          onClick={() => setSelected("Student")}
        >
          Student
        </button>
        <button
          className={`text-gray-800 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
            selected === "Faculty" && "border-b-2 border-green-500"
          }`}
          onClick={() => setSelected("Faculty")}
        >
          Staff
        </button>
        <button
          className={`text-gray-800 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
            selected === "Admin" && "border-b-2 border-green-500"
          }`}
          onClick={() => setSelected("Admin")}
        >
          Admin
        </button>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
