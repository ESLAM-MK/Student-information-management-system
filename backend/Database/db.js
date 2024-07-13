require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/Gradpro";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;
