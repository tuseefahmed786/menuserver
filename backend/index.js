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
const mongoose = require('mongoose');

// const db = 'mongodb://atuseef261:emenutuseef@emenudb-shard-00-00.vdtcf.mongodb.net:27017,emenudb-shard-00-01.vdtcf.mongodb.net:27017,emenudb-shard-00-02.vdtcf.mongodb.net:27017/?ssl=true&replicaSet=atlas-fmwgzm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=emenudb'
const db = process.env.MONGO_URI; // Make sure to set this in Vercel

mongoose.connect(db).then(() => {
    console.log("connnect db")
}).catch((error) => {
    console.log("error in db" + error)

})
app.use(cors({
    origin: 'https://emenu-sandy.vercel.app/', // Replace with your Vercel app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow credentials (if needed)
}));

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});


app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));



app.use(restaurantRouter)
app.use(menuRouter)
app.use(userRouter)
app.use(addCategory)
app.use(itemsProducts)
app.use(iconsRouter)
// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
