import mongoose from "mongoose";
const recordSchema = mongoose.Schema({
  title: String,
  creator: String,
  audioFile: String,
  duration: Number,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});
var Record = mongoose.model("Record", recordSchema);
export default Record;
