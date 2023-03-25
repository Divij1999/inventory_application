const Category = require("../models/category");
const async = require("async");
const Part = require("../models/part");
const { body, validationResult } = require("express-validator");
const category = require("../models/category");

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

exports.get_category_parts = (req, res) => {
  async.parallel(
    {
      category(cb) {
        Category.findById(req.params.id).then((res) => {
          cb(null, res);
        });
      },
      category_parts(cb) {
        Part.find({ category: req.params.id })
        .then((res) => {
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
