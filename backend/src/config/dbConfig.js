const mongoose = require("mongoose");
const mongodb = require("mongodb");

//const URL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.iod39cc.mongodb.net/?retryWrites=true&w=majority`;
const URL = `mongodb://127.0.0.1:27017/annotations`;
const connectionDB = () => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};

module.exports = connectionDB;
