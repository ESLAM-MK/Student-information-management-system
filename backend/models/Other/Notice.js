const mongoose = require("mongoose");

const Notice = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // type: {
  //   type: String,
  // },
  link: {
    type: String,
  },
  subject: {
    type: String,
    required:true
  },
  semester: {
    type: String,
    required:true
  }
}, { timestamps: true });

module.exports = mongoose.model("Notice", Notice);
