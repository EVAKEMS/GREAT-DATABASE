const express = require("express");
const { loginUser, registerUser, updateUser, getAllUsers, getUserById, deleteUser} = require("../controller/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/:login", loginUser);
router.put("/:id", updateUser)
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.get("/:id", deleteUser)

module.exports = router;