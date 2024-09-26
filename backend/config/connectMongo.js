
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://atuseef261:l9LKEvOOpSAzoih8@myapp.j7pze.mongodb.net/?retryWrites=true&w=majority&appName=myapp";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// const connectDB = async () => {
//     try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// module.exports = connectDB;



// // // config/db.js
// // const mongoose = require('mongoose');
// // require('dotenv').config()

// // // Function to connect to the database
// // const connectDB = async () => {
// //     try {
// //         // Connect to MongoDB
// //         console.log(process.env.MONGO_URI)
// //         await mongoose.connect("mongodb+srv://atuseef261:l9LKEvOOpSAzoih8>@myapp.j7pze.mongodb.net/?retryWrites=true&w=majority&appName=myapp");
// //         console.log("Connected to the database 1");
// //     } catch (error) {
// //         console.error('Connection error:', error);
// //         process.exit(1); // Exit the process with failure
// //     }
// // };

// // // Export the connectDB function
// // module.exports = connectDB;
