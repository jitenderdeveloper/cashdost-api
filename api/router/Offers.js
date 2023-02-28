const express = require('express')
const router = express.Router()
const Offer = require('../modules/OfferSchema')

router.get('/', (req, res) =>{
    try {
        Offer.find()
        .then((result) =>{
            res.status(200).json({
                message: 'All Offer data...',
                offer_data: result
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
        const offer_data = Offer({
            title:req.body.title,
            link:req.body.link
        })
        offer_data.save()
        .then((result) =>{
            res.status(200).json({
                message: 'All offer data...',
                offer_data: result
            })
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})



module.exports = router;