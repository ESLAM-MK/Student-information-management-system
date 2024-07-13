const mongoose = require("mongoose");

const studentDetails = new mongoose.Schema({
  enrollmentNo: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: false,
  },
  password:{
    type:String,
    required:true,
    default:"112233"
  },
  parentPhone:{
    type:String,
    required:true,
  },
  Addresse:{
    type:String,
    required:true
  },
  NationalId:{
    type:String,
    required:true
  },
  religion:{
    type:String,
    required:true
  },
  highSchool:{
    type:Number,
    required:true
  }
}, { timestamps: true });

const student =  mongoose.model("Student Detail", studentDetails)
const prep =  mongoose.model("PreparatoryStudent", studentDetails ,"PreparatoryStudent")
const first =  mongoose.model("FirstYearStudent", studentDetails,"FirstYearStudent")
const second =  mongoose.model("SecondYearStudent", studentDetails,"SecondYearStudent")
const third =  mongoose.model("ThirdYearStudent", studentDetails,"ThirdYearStudent")
const forth =  mongoose.model("ForthYearStudent", studentDetails,"ForthYearStudent")

module.exports = {
  student,
  prep,
  first,
  second,
  third,
  forth
};
