const express = require('express')
const router = express.Router()
const Coupon = require('../modules/CouponSchema')

// ---multar-section---

const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image/offer/");
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

router.get('/', (req, res) =>{
    try {
        Coupon.find()
        .then((result) =>{
            res.status(200).json({
                message: 'All Coupon data...',
                coupon_data: result
            })
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})

router.post('/', upload.single("file"), (req, res) =>{
    try {
        const coupon_data = Coupon({
            offer:req.body.offer,
            logo:req.file.path,
            offer_desc:req.body.offer_desc,
            cashback:req.body.cashback,
            description:req.body.description,
            link:req.body.link
        })
        coupon_data.save()
        .then((result) =>{
            res.status(200).json({
                message: 'All Coupon data...',
                coupon_data: result
            })
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})

router.delete('/:id', (req, res) =>{
    try {
        Coupon.findByIdAndRemove({_id: req.params.id})
        .then((result) =>{
            res.status(200).json({
                message: 'data is deleted...',
                coupon_data: result
            })
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})


module.exports = router;