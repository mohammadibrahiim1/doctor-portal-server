const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
// const user = require('')


const GOOGLE_CLIENT_ID = '275694306890-01pl0egnr7ul49mn08q5ddq4o0en6513.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';


const FACEBOOK_APP_ID = '3583797045230870';
const FACEBOOK_APP_SECRET = '94407eb5669413bb484b258e9d12607d';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},

    async (accessToken, refreshToken, profile, done) => {
        const defaultUser = {
            name: profile.displayName,
            email: profile.emails[0].value,
            photoURL: profile.photos[0].value,
            googleId: profile.id

        }

        const user = 
        done(null, profile);
    }
));


passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: [
        'id', 'displayName', 'name', 'gender', 'email', 'photoURL'
    ]
},

    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        new User({
            userName: profile.displayName,
            facebookId: profile.id
        }).save().then((newUser) => {
            console.log("new user created:" + newUser);
        })
        return done(null, profile);
    }
))

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})  