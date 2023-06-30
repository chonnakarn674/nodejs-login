const express = require('express')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const { isLoggedIn } = require('./auth')
const config = require('../config/config')

const router = express.Router()

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookAuth.clientID,
      clientSecret: config.facebookAuth.clientSecret,
      callbackURL: config.facebookAuth.callbackURL,
      profileFields: ['id', 'displayName', 'photos', 'email']
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

router.get('/login', passport.authenticate('facebook'))

router.get(
  '/oauth2/redirect',
  passport.authenticate('facebook', {
    successRedirect: '/facebook/profile',
    failureRedirect: '/error'
  })
)

module.exports = router
