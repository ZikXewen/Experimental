import express from "express";
import Record from "../models/Record.js";
import mongoose from "mongoose";
import { PythonShell } from "python-shell";
import fs from "fs";
import { fileSync } from "tmp";

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
  const newRecord = new Record(req.body);
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
  const tempObj = fileSync({ postfix: ".wav" });
  fs.writeFileSync(
    tempObj.name,
    Buffer.from(audioFile.replace("data:audio/wav;base64,", ""), "base64")
  );
  PythonShell.run(
    "./processing/getCC.py",
    { args: [tempObj.name] },
    (err, pyRet) => {
      if (err) throw err;
      tempObj.removeCallback();
      res.status(200).send(pyRet);
    }
  );
};
export default router;
