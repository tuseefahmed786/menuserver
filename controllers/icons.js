// // scripts/seedIcons.js
// const mongoose = require('mongoose');
// const connectDB = require('../config/connectMongo'); // Adjust the path as necessary
const Icon = require('../schema/icons');
// // Array of icons to be stored
// const icons = [
//     {  url: '/icons/coffee-cup.png' },
//     {  url: '/icons/burger.png'},
//     {  url: '/icons/cupcake.png' },
//     { url: '/icons/donut.png'},
//     { url: '/icons/fried-rice.png'},
//     { url: '/icons/english-breakfast.png'},
//     { url: '/icons/iced-coffee.png'},
//     { url: '/icons/matcha.png'},
//     { url: '/icons/noodles.png'},
//     { url: '/icons/v60.png'},
//     { url: '/icons/steak.png'},
//     { url: '/icons/salad.png'},
//     { url: '/icons/pizza.png'},
//     { url: '/icons/soda.png'},
//     { url: '/icons/mandi.png'},
// ];

// // Function to seed icons
// const seedIcons = async () => {
//     await connectDB(); // Connect to MongoDB

//     try {
//         // Check for existing icons to prevent duplicates
//         const existingIcons = await Icon.find({});
//         if (existingIcons.length > 0) {
//             console.log('Icons already exist in the database. Exiting.');
//             return; // Exit if icons already exist
//         }

//         // Insert all icons
//         await Icon.insertMany(icons);
//         console.log('All icons added to the database successfully.');
//     } catch (error) {
//         console.error('Error adding icons to the database:', error);
//     } finally {
//         mongoose.connection.close(); // Close the connection
//     }
// };

// Run the script
// seedIcons();

const getIcons = async (req, res) => {
    try {
        const icons = await Icon.find({}); // Fetch all icons from the database
        res.json(icons); // Send the icons as a JSON response
    } catch (error) {
        console.error('Error fetching icons:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports =  {getIcons} ;