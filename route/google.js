const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const { isLoggedIn } = require('./auth')
const config = require('../config/config')

const router = express.Router()

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleAuth.clientID,
      clientSecret: config.googleAuth.clientSecret,
      callbackURL: config.googleAuth.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile)
    }
  )
)

router.get('/profile', isLoggedIn, function (req, res) {
  // console.log(req.user)
  res.render('pages/profile.ejs', {
    user: req.user
  })
})

router.get('/login', passport.authenticate('google', { scope: ['profile'] }))

router.get(
  '/oauth2/redirect',
  passport.authenticate('google', {
    successRedirect: '/google/profile',
    failureRedirect: '/error'
  })
)

module.exports = router
