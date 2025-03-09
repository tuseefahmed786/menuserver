const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../schema/user');
const Restaurant = require("../schema/restaurant");
// require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://menuserver-eight.vercel.app/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        console.log("User logging in with email:", email);

        let user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (user) {
            // 🟢 Existing user, log them in
            console.log("User found, logging in:", user.email);
            return done(null, user);
        }

        // 🔴 New User Signup Flow
        console.log("New user, creating account...");

        const restaurantName = profile.displayName;
        let uniqueRestaurantName = restaurantName;
        let normalizedRestaurantName = restaurantName.replace(/\s+/g, '').toLowerCase();

        // Check if restaurant name exists
        const existingRestaurant = await Restaurant.findOne({ nameWithOutSpace: new RegExp(`^${normalizedRestaurantName}$`, 'i') });

        if (existingRestaurant) {
            const randomSuffix = Math.floor(1000 + Math.random() * 9000);
            uniqueRestaurantName = `${restaurantName} ${randomSuffix}`;
            normalizedRestaurantName = `${normalizedRestaurantName}${randomSuffix}`;
        }

        // Create new user
        const trialExpiresAt = new Date();
        trialExpiresAt.setDate(trialExpiresAt.getDate() + 7);

        user = new User({
            email,
            password: null,
            restaurantName: uniqueRestaurantName,
            trialExpiresAt,
            subscriptionStatus: 'active',
            subscriptionType: 'free_trial',
            subscriptionStartDate: new Date(),
            subscriptionEndDate: trialExpiresAt
        });

        await user.save();

        // Create restaurant for new user
        const createNewRestaurant = new Restaurant({
            name: uniqueRestaurantName,
            nameWithOutSpace: normalizedRestaurantName,
            ownerId: user._id
        });

        await createNewRestaurant.save();

        console.log("New user and restaurant created:", uniqueRestaurantName);
        return done(null, user);

    } catch (err) {
        console.error("Error in authentication:", err);
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;   
