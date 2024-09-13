// RutasWeb.js
import express from "express";
const router = express.Router();
import userController from "../controllers/usersController.js";
import { verify } from "../tools/token.js";
import recordController from "../controllers/recordController.js";

router.post("/createUser", verify, userController.createUser);
router.get("/getUsers", verify, userController.findUsers);
router.post("/deleteUser/:id", verify, userController.deleteUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/createRecord", verify, recordController.createRecord);
router.get("/getRecords/:ownerid", verify, recordController.getRecords);
export default router;
