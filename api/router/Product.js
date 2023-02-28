const express = require('express')
const router = express.Router()
const Product = require('../modules/ProductSchema')
const authorization = require('../middleware/auth')

router.get('/',authorization.adminAuth, (req, res) =>{
    try {
        Product.find()
        .populate('category_id')
        .populate('offer_id')
        .populate('client_id')
        .then((result) =>{  
            res.status(200).json({
                message: 'All product data...',
                product_data: result
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
        const product_data = Product({
            category_id:req.body.category_id,
            offer_id:req.body.offer_id,
            client_id:req.body.client_id,
            title:req.body.title,
            image:req.body.image,
            description:req.body.description,
            link:req.body.link
        })
        product_data.save()
        .then((result) =>{
            res.status(200).json({
                message: 'All product data...',
                product_data: result
            })
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})



module.exports = router;