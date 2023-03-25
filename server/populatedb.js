#! /usr/bin/env node

// Get arguments passed in the command line
const userArgs = process.argv.slice(2);

const async = require("async");
const Part = require("./models/part");
const Category = require("./models/category");

const mongoose = require("mongoose");

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB, {
    dbName: "inventory_application",
  });
  console.log(mongoose.connection.readyState);
}

const categories = [];

const categoryCreate = (name) => {
  const category = new Category({ name });

  categories.push(category);
  category.save();
};

const partCreate = (name, description, category, price, stock) => {
  partDetails = { name, description, category, price, stock };

  const part = new Part(partDetails);

  part
    .save()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

function addCategory() {
  async
    .series([
      function (callback) {
        callback(null, categoryCreate("Motherboard"));
        console.log(categories);
      },
      function (callback) {
        callback(null, categoryCreate("Processor"));
      },
      function (callback) {
        callback(null, categoryCreate("CPU"));
      },
      function (callback) {
        callback(null, categoryCreate("GPU"));
      },
      function (callback) {
        callback(null, categoryCreate("Case"));
      },
    ])
    .then((res) => {
      res.forEach((res) => categories.push(res));
    });
}

console.log(categories);
const addPart = () => {
  async.parallel([
    (callback) => {
      partCreate(
        "i7-7700HQ",
        "An Intel 7th generation quad core processor",
        categories[1],
        100,
        20
      );
      console.log(categories);
      callback(null, null);
    },
    (callback) => {
      partCreate(
        "i5-12400",
        "An Intel 12th generation processor having 4 P cores and no E cores",
        categories[1],
        125,
        30
      );
      callback(null, null);
    },
    (callback) => {
      partCreate(
        "Bq550",
        "A motherboard from Gigabyte",
        categories[0],
        160,
        10
      );
      callback(null, null);
    },
    (callback) => {
      partCreate(
        "ADATA 8x2",
        "A pair of DDR4 ram sticks",
        categories[2],
        100,
        20
      );
      callback(null, null);
    },
    (callback) => {
      partCreate(
        "h562",
        "A latest motherboard from Asus, featuring new and exciting features",
        categories[0],
        175,
        11
      );
      callback(null, null);
    },
    (callback) => {
      partCreate(
        "ADATA Strix 16x2",
        "A high end DDR5 ram from ADATA",
        categories[1],
        100,
        20
      );
      callback(null, null);
    },
    (callback) => {
      partCreate(
        "Geforce RTX 3060",
        "A middle end GPU from Nvidia",
        categories[3],
        300,
        8
      );
      callback(null, null);
    },
    (callback) => {
      partCreate(
        "Radeon 7500",
        "A latest generation GPU from AMD",
        categories[3],
        285,
        12
      );
      callback(null, null);
    },
    (callback) => {
      partCreate(
        "Geforce 1080ti",
        "The GPU having the best cost to performace ratio since a decade from Nvidia",
        categories[3],
        200,
        40
      );
      callback(null, null);
    },
    (callback) => {
      partCreate(
        "Lian Li Airflow",
        "A good airflow case from Lian Li. It offers excellent cooling for low to mid end builds",
        categories[4],
        110,
        50
      );
      callback(null, null);
    },
    (callback) => {
      partCreate(
        "Dynamo Extreme Cool",
        "A new case from Dynamo. It provides better airflow than their previous servings",
        categories[4],
        115,
        20
      );
      callback(null, null);
    },
  ]);
};

async.series(
  [
    (cb) => {
      addCategory();
      cb(null, null);
    },
    (cb) => {
      addPart();
      cb(null, null);
    },
  ],
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);
