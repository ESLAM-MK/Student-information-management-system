const mongoose = require("mongoose");

const ExamsAns = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  courseName: {
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
  mcqMark:{
    type:String,
    required:true
  },
  allAns:{
    type:Object,
    required:true
  }
}, { timestamps: true });

module.exports = mongoose.model("ExamsAns", ExamsAns);
