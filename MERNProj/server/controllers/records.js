import express from "express";
import Record from "../models/Record.js";
import mongoose from "mongoose";
import axios from "axios";

const router = express.Router();

export const getRecords = async (req, res) => {
  try {
    const allRecords = await Record.find();
    res.status(200).json(allRecords);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createRecord = async (req, res) => {
  const newRecord = new Record({
    ...req.body,
    createdAt: new Date().toISOString(),
  });
  try {
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const deleteRecord = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).send("Record not found");
  await Record.findByIdAndDelete(id);
  res.status(200).json({ message: "Success" });
};
export const getCC = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).send("Record not found");
  const { audioFile } = await Record.findById(id);
  try {
    const { data } = await axios.post("https://kratua.loca.lt", {
      testString: audioFile.replace("data:audio/wav;base64,", ""),
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Get CC Error");
  }
};
export default router;
