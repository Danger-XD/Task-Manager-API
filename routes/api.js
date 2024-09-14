import express from "express";
const router = express.Router();//it defines the routes only or creates route instance

import * as taskController from "../app/controllers/taskController.js";
import * as usersController from "../app/controllers/usersController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";

//user
router.post("/registration",usersController.registration);
router.post("/login",usersController.login);
router.get("/profileDetails",authMiddleware,usersController.profileDetails);
router.post("/profileUpdate",authMiddleware,usersController.profileUpdate);
router.get("/emailVerify/:email",usersController.emailVerify);
router.post("/otpVerify",usersController.otpVerify);
router.post("/resetPassword",usersController.resetPassword);

//task
router.post("/createTask",authMiddleware, taskController.createTask);
router.get("/updateTaskStatus/:id/:status",authMiddleware,taskController.updateTaskStatus);
router.get("/taskListByStatus/:status",authMiddleware, taskController.taskListByStatus);
router.delete("/deleteTask/:id",authMiddleware, taskController.deleteTask);
router.get("/countTask",authMiddleware,taskController.countTask);


export default router;