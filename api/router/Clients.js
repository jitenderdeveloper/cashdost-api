const express = require('express')
const router = express.Router()
const Client = require('../modules/ClientSchema')

// ---multar-section---

const multer = require("multer");
const path = require('path')

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

router.get('/', (req, res) =>{
    try {
        Client.find()
        .then((result) =>{
            res.status(200).json({
                message: 'All Client data...',
                client_data: result
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
        const client_data = Client({
            title:req.body.title,
            image:req.file.path,
            offer:req.body.offer,
            link:req.body.link
        })
        client_data.save()
        .then((result) =>{
            res.status(200).json({
                message: 'All client data...',
                client_data: result
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
        Client.findByIdAndRemove({_id: req.params.id})
        .then((result) =>{
            res.status(200).json({
                message: 'data is deleted...',
                client_data: result
            })
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})


module.exports = router;