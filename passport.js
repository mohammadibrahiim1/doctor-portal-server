const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



const GOOGLE_CLIENT_ID = '275694306890-01pl0egnr7ul49mn08q5ddq4o0en6513.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})