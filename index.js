const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const restaurantRouter = require('./routes/restaurantRoutes')
const menuRouter = require('./routes/menuRoute');
const { userRouter } = require('./routes/userRoute');
const addCategory = require('./routes/addCategory')
const itemsProducts = require('./routes/itemsProduct')
const iconsRouter = require('./routes/icons')
const fetchMenu = require('./routes/fetchMenu')
const isValidToken = require('./routes/isValidToken')
const stripePayment = require('./routes/stripe')
const socialLink = require('./routes/socialLink')
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config()
const authUser = require('./controllers/authUser');
const passport = require('./middleware/passport'); 
// const db = 'mongodb://atuseef261:emenutuseef@emenudb-shard-00-00.vdtcf.mongodb.net:27017,emenudb-shard-00-01.vdtcf.mongodb.net:27017,emenudb-shard-00-02.vdtcf.mongodb.net:27017/?ssl=true&replicaSet=atlas-fmwgzm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=emenudb'
const db = process.env.MONGO_URI; 

mongoose.connect(db).then(() => {
    console.log("connected db")
}).catch((error) => {
    console.log("error in db" + error)
})

app.use(cors({
    origin: ['https://qr.cloudymenu.com', 'https://www.qr.cloudymenu.com', 'https://www.cloudymenu.com', 'https://cloudymenu.com'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(authUser);
app.use(fetchMenu)
app.use(restaurantRouter)
app.use(menuRouter)
app.use(userRouter)
app.use(addCategory)
app.use(itemsProducts)
app.use(iconsRouter)
app.use(isValidToken)
app.use(stripePayment)
app.use(socialLink)

// Start the server 
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
