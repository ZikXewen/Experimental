import mongoose from "mongoose";
const recordSchema = mongoose.Schema({
  title: String,
  creator: String,
  audioFile: String,
  duration: Number,
  createdAt: Date,
});
var Record = mongoose.model("Record", recordSchema);
export default Record;
