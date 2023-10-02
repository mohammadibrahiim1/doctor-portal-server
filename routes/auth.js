const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = 'http://localhost:3000';

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successful',
            user: req.user
        });
    }
});


router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failed'
    })
})


router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect(CLIENT_URL)
});



// google authenticate
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
}));





// facebook authenticate
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}));

router.get('/profile', (req, res) => {
    res.send(`You are a valid user`)
});

router.get('/login/failed', (req, res) => {
    res.send(`You are a non valid user`)
})


module.exports = router