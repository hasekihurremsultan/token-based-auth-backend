const express = require("express");
const router = express.Router();

// Middlewares
const { verifyUser } = require("../middlewares/verify");

// Controllers
const addTodo = require("../controllers/addTodo");
const deleteTodo = require("../controllers/deleteTodo");

router.post("/new-todo", verifyUser, addTodo);
router.delete("/delete-todo/:todoId", verifyUser, deleteTodo);

module.exports = router;