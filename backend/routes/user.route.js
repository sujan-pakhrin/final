import express from "express";
import {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/user", addUser);
router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
