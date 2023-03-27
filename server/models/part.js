const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartSchema = new Schema({
  name: { type: String, required: true, maxLength: 60 },
  description: { type: String, required: true, maxLength: 150 },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true },
  stock: Number,
});

PartSchema.virtual("url").get(function () {
  return `parts/${this._id}`;
});

module.exports = mongoose.model("Part", PartSchema);
