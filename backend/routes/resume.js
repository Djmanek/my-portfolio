import express from "express";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";

import {
  getResume,
  uploadResume,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.get("/", getResume);
router.post("/", verifyToken, upload.single("resume"), uploadResume);
router.delete("/", verifyToken, deleteResume);

export default router;