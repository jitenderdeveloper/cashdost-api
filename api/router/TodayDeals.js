const express = require("express");
const router = express.Router();
const TodayDeals = require("../modules/TodayDealsSchema");
const authorization = require("../middleware/auth");
// const path = require('path')

// ---multar-section---

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image/todaydeals/");
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

const multiple_upload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "client_logo", maxCount: 1 },
]);

router.get("/", (req, res) => {
  try {
    TodayDeals.find().then((result) => {
      res.status(200).json({
        message: "All today deals data...",
        today_deals_data: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/", multiple_upload, (req, res) => {
  // console.log('product image -->', req.files);
  try {
    const deals_data = TodayDeals({
      image: req.files.image[0].filename,
      client_logo: req.files.client_logo[0].filename,
      description: req.body.description,
      today_offer: req.body.today_offer,
      link: req.body.link,
    });
    deals_data.save().then((result) => {
    //   console.log("deals data -->", result);
      res.status(200).json({
        message: "All today deals data...",
        today_deals_data: result,
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
    TodayDeals.findOneAndRemove({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: "today deals is Deleted",
        today_deals_data: result,
      });
    });
    // console.log('delete data --->', delete_data);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
