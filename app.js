const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

//import router----
const UsersRouter = require('./api/router/User')
const ProductRouter = require('./api/router/Product')
const CategoryRouter = require('./api/router/Category')
const ClientRouter = require('./api/router/Clients')
const OfferRouter = require('./api/router/Offers')

// --mongoose-connection----
const mongoose = require('mongoose');
const url = 'mongodb+srv://cashdost:WRfMWhiCrzYtP7VR@cashdost-api.pe9pxtd.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', (error)=>{
    console.log('connection failed...')
});
mongoose.connection.on('connected', (connected)=>{
    console.log('connection successfuly...');
});
// --mongoose-connection----


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


app.use(cors())

//router connection----
app.use('/public',express.static('public'));

app.use('/cashdost/api/user', UsersRouter)
app.use('/cashdost/api/product', ProductRouter)
app.use('/cashdost/api/category', CategoryRouter)
app.use('/cashdost/api/client', ClientRouter)
app.use('/cashdost/api/offer', OfferRouter)



app.use((req, res)=>{
    try {
        res.status(200).json({
            message: 'app is running...'
        })
    } catch (error) {
        res.status(404).json({ 
            error: 'bad request...'
        })
    }
})


module.exports = app;


//WRfMWhiCrzYtP7VR
//WRfMWhiCrzYtP7VR

