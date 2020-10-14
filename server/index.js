const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const session = require("express-session");
const { check, validationResult } = require("express-validator");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Session Config
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to DB.");
  });

//   Mongo Models

const { Product } = require("./schemas/Products");

app.get("/", (req, res) => {
  res.json({ msg: "Hi there!" });
});

// Routes

const apiKeyRoute = require("./routes/fromapi").router;
app.use("/from-api", apiKeyRoute);

// TODO: Add Auth for all the routes

app.get("/products", async (req, res) => {
  const { category } = req.query;
  let products;

  //   If query exists
  if (category) {
    products = await Product.find({
      apiKey: "sample",
      category: { $all: [category] },
    });
  } else {
    products = await Product.find({ apiKey: "sample" });
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

app.get("/products/:id", async (req, res) => {
  var product = await Product.findOne({ _id: req.params.id });

  product = product.toObject();

  product["id"] = product._id;

  delete product._id;
  delete product.__v;

  res.json({ product });
});

app.post("/cart", [check("items").isArray().exists()], async (req, res) => {
  if (validationResult(req).isEmpty()) {
    const { items } = req.body;

    let promises = [];
    items.forEach((item) => {
      promises.push(Product.findOne({ _id: item.id }));
    });

    const products = await Promise.all(promises);

    // Remove values
    var sProducts = [];

    products.forEach((product, index) => {
      let sProduct = product.toObject();
      sProduct["id"] = sProduct._id;

      delete sProduct._id;
      delete sProduct.__v;

      sProducts.push(sProduct);
    });

    res.json({ products: sProducts });
  } else {
    res.json({ success: false });
  }
});

// Stripe
const calculateOrderAmount = (items) => {
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
