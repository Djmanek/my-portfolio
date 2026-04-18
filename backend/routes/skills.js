import express from "express";
import {
  getSkills,
  addSkill,
  deleteSkill,
} from "../controllers/skillsController.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", addSkill);
router.delete("/:id", deleteSkill);

export default router;