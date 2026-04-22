import express from "express";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";

import {
  getResume,
  serveResume,
  uploadResume,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.get("/", getResume);           // get metadata
router.get("/file", serveResume);     // serve actual PDF
router.post("/", verifyToken, upload.single("resume"), uploadResume);
router.delete("/", verifyToken, deleteResume);

export default router;