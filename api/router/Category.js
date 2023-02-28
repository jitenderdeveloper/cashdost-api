const express = require('express')
const router = express.Router()
const Category = require('../modules/CategorySchema')

router.get('/', (req, res) =>{
    try {
        Category.find()
        .then((result) =>{
            res.status(200).json({
                message: 'All Category data...',
                category_data: result
            })
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})


router.post('/', (req, res) =>{
    try {
        const category_data = Category({
            title:req.body.title,
            link:req.body.link
        })
        category_data.save()
        .then((result) =>{
            res.status(200).json({
                message: 'All Category data...',
                category_data: result
            })
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})

module.exports = router;