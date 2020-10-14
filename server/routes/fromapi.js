const express = require("express");
const { route } = require("next/dist/next-server/server/router");
const router = express.Router();

const { APIKey } = require("../schemas/Apikey");
const { Product } = require("../schemas/Products");

router.get("/apikeys", async (req, res) => {
  const keys = await APIKey.find();

  // Remove values
  var sKeys = [];

  keys.forEach((key) => {
    let sKey = key.toObject();
    sKey["id"] = sKey._id;

    delete sKey._id;
    delete sKey.__v;

    sKeys.push(sKey);
  });

  res.json({
    apikeys: sKeys,
  });
});

router.get("/products", async (req, res) => {
  const { category, apikey } = req.query;
  let products;

  //   If query exists
  if (category) {
    products = await Product.find({
      category: { $all: [category] },
      apiKey: apikey,
    });
  } else {
    products = await Product.find({ apiKey: apikey });
  }

  var sProducts = [];

  products.forEach((product, index) => {
    let sProduct = product.toObject();
    sProduct["id"] = sProduct._id;

    delete sProduct._id;
    delete sProduct.__v;

    sProducts.push(sProduct);
  });

  res.json({ products: sProducts });
});

router.get("/products/:id", async (req, res) => {
  var product = await Product.findOne({ _id: req.params.id });

  product = product.toObject();

  product["id"] = product._id;

  delete product._id;
  delete product.__v;

  res.json({ product });
});

module.exports = {
  router,
};
