const express = require("express");
const router = express.Router();

// Middlewares
const { verifyUser } = require("../middlewares/verify");

// Controllers
const addTodo = require("../controllers/addTodo");
const updateTodo = require("../controllers/updateTodo");
const deleteTodo = require("../controllers/deleteTodo");
const getAllTodos = require("../controllers/getAllTodos");

router.post("/new-todo", verifyUser, addTodo);

router.delete("/delete-todo/:todoId", verifyUser, deleteTodo);

router.get("/get-all-todos", verifyUser, getAllTodos);

router.put("/update-todo/:todoId", verifyUser, updateTodo);

module.exports = router;