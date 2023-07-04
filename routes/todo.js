const express = require("express");
const router = express.Router();

// Middlewares
const { verifyUser } = require("../middlewares/verify");

// Controllers
const addTodo = require("../controllers/addTodo");
const deleteTodo = require("../controllers/deleteTodo");
const getAllTodos = require("../controllers/getAllTodos");

router.post("/new-todo", verifyUser, addTodo);
router.delete("/delete-todo/:todoId", verifyUser, deleteTodo);
router.get("/get-all-todos", verifyUser, getAllTodos);

module.exports = router;