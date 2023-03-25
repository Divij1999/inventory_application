const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const part_controller = require("../controllers/partController");

// List all categories
router.get("/categories", category_controller.category_list);

// List parts related to a single category
router.get("/categories/:id", category_controller.get_category_parts);

module.exports = router;
