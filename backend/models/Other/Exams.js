const mongoose = require("mongoose");

const Exams = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required:true
  },
  fullMark: {
    type: String,
    required:true
  },
  level:{
    type:String,
    required:true
  },
  semester:{
    type:String,
    required:true
  },
  time:{
    type:String,
    required:true
  },
  allquestions:{
    type:Array,
    required:true
  }
}, { timestamps: true });

module.exports = mongoose.model("Exams", Exams);
