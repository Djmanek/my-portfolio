import express from "express";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";

import {
  getProjects,
  addProject,
  deleteProject,
} from "../controllers/projectsController.js";

const router = express.Router();

router.get("/", getProjects);

// 🔥 Protected routes
router.post("/", verifyToken, upload.single("image"), addProject);
router.delete("/:id", verifyToken, deleteProject);

export default router;