const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const part_controller = require("../controllers/partController");

// List all categories
router.get("/categories", category_controller.category_list);

// List parts related to a single category
router.get("/categories/:id", category_controller.get_category_parts);

// Create a new category
router.post("/categories", category_controller.create_category);

// Delete a category

router.delete("/categories/:name", category_controller.delete_category);

// List all the parts

router.get("/", part_controller.get_part_list);

// List a particular part
router.get("/:id", part_controller.get_part);

// Create a new part
router.post("/categories/:id", part_controller.create_part);

// Delete a part
router.delete("/:id", part_controller.delete_part);
module.exports = router;
