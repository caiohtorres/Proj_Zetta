const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  src: { type: String },
});

module.exports = mongoose.model("File", FileSchema);
