const Part = require("../models/part");
const mongoose = require("mongoose");

// Get all the parts

exports.get_part_list = (req, res) => {
  Part.find()
    .then((parts) => {
      res.json(parts);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

// Get details about a part
exports.get_part = (req, res) => {
  Part.findById(req.params.id)
    .populate("category")
    .then((part) => {
      res.json(part);
    });
};

// Create a new part

exports.create_part = (req, res) => {
  let { name, description, category, price, stock } = req.body;
  categoryID = new mongoose.Types.ObjectId(category);
  const newPart = new Part({
    name,
    description,
    category: categoryID,

    price,
    stock,
  });
  newPart
    .save()
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};

// Delete part

exports.delete_part = (req, res) => {
  Part.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};
