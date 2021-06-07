import express from "express";
import {
  getRecords,
  createRecord,
  deleteRecord,
  getCC,
} from "../controllers/records.js";

const router = express.Router();

router.get("/", getRecords);
router.post("/", createRecord);
router.delete("/:id", deleteRecord);
router.get("/:id", getCC);

export default router;
