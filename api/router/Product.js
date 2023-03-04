const express = require("express");
const router = express.Router();
const Product = require("../modules/ProductSchema");
const authorization = require("../middleware/auth");
const fs = require("fs");

// ---multar-section---

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// const multiple_upload = upload.fields([{ name: "image", maxCount: 2 }]);

router.get("/", (req, res) => {
  try {
    Product.find()
      // .populate('category_id')
      // .populate('offer_id')
      // .populate('client_id')
      .then((result) => {
        res.status(200).json({
          message: "All product data...",
          product_data: result,
        });
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/", upload.single('file'), (req, res) => {
  // console.log("product image -->", req.files);
  try {
    const product_data = Product({
      category: req.body.category,
      offer: req.body.offer,
      client: req.body.client,
      title: req.body.title,
      image: req.file.filename,
      description: req.body.description,
      link: req.body.link,
    });
    product_data.save().then((result) => {
      res.status(200).json({
        message: "All product data...",
        product_data: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: `product api is not working ${error.message}`,
    });
  }
});

router.put("/:id", upload.single("file"), (req, res) => {
  // console.log('product image -->', file);
  try {
    Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          category: req.body.category,
          offer: req.body.offer,
          client: req.body.client,
          title: req.body.title,
          image: req.file.path,
          description: req.body.description,
          link: req.body.link,
        },
      }
    ).then((result) => {
      res.status(200).json({
        message: "All product data...",
        product_data: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    Product.findByIdAndDelete({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: "Product is Deleted",
        product_data: result,
      });
    });
    // console.log("delete data --->", delete_data);
  } catch (error) {
    res.status(400).json({
      message: `product api ${error.message}`,
    });
  }
});

module.exports = router;
