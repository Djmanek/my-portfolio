import express from "express";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";

import {
  getProjects,
  serveProjectImage,
  addProject,
  deleteProject,
} from "../controllers/projectsController.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id/image", serveProjectImage);   // ✅ serve image from DB
router.post("/", verifyToken, upload.single("image"), addProject);
router.delete("/:id", verifyToken, deleteProject);

export default router;