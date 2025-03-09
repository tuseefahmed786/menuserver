const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../schema/user');
const Restaurant = require("../schema/restaurant");
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://menuserver-eight.vercel.app/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        console.log(email)
        const restaurantName = profile.displayName;
        const normalizedRestaurantName = restaurantName.replace(/\s+/g, '').toLowerCase();

        let user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (!user) {
            const trialExpiresAt = new Date();
            trialExpiresAt.setDate(trialExpiresAt.getDate() + 7);

            user = new User({
                email,
                password: null,
                restaurantName,
                trialExpiresAt,
                subscriptionStatus: 'active',
                subscriptionType: 'free_trial',
                subscriptionStartDate: new Date(),
                subscriptionEndDate: trialExpiresAt
            });

            await user.save();

            const createNewRestaurant = new Restaurant({
                name: restaurantName,
                nameWithOutSpace: normalizedRestaurantName,
                ownerId: user._id
            });

            await createNewRestaurant.save();
        }

        return done(null, user);
    } catch (err) {
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
