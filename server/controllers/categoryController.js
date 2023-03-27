const Category = require("../models/category");
const async = require("async");
const Part = require("../models/part");
const { body, validationResult } = require("express-validator");

// Show all categories
exports.category_list = (req, res) => {
  Category.find()
    .then((category_list) => {
      res.json(category_list);
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};

// List a category and it's parts
exports.get_category_parts = (req, res) => {
  async.parallel(
    {
      category(cb) {
        Category.findById(req.params.id).then((res) => {
          cb(null, res);
        });
      },
      category_parts(cb) {
        Part.find({ category: req.params.id }).then((res) => {
          cb(null, res);
        });
      },
    },
    (err, results) => {
      if (err) console.log(err);
      res.json({
        category: results.category,
        parts: results.category_parts,
      });
    }
  );
};

// Create a new category

exports.create_category = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    res.json(await newCategory.save());
  } catch (err) {
    if (err) console.log(err);
  }
};

// Delete a category

exports.delete_category = async (req, res) => {
  // Get the category entered
  const category = await Category.find({ name: req.params.name });

  // Get the ID of the category entered
  const categoryID = category[0]._id.toString();

  // Get a part associated with the category
  const category_has_parts = await Part.find({ category: categoryID });

  async.parallel(
    [
      (cb) => {
        // Check if there are any parts in this category
        if (category_has_parts) {
          // If so delete all the parts
          Part.deleteMany({ category: categoryID })
            .then((res) => {
              cb(null, res);
            })
            .catch((err) => {
              if (err) console.log(err);
            });
        } else return cb(null, null);
      },
      (cb) => {
        // Delete the category
        Category.deleteOne({ name: req.params.name })
          .then((res) => {
            cb(null, res);
          })
          .catch((err) => {
            if (err) console.log(err);
          });
      },
    ],
    (err, results) => {
      if (err) console.log(err);
      // Return how many documents were deleted
      res.send({ results });
    }
  );
};
