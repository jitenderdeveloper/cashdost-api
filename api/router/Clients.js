const express = require('express')
const router = express.Router()
const Client = require('../modules/ClientSchema')

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

router.post('/', (req, res) =>{
    try {
        const client_data = Client({
            title:req.body.title,
            image:req.body.image,
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


module.exports = router;