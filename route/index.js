const express = require('express')
const google = require('./google')
const facebook = require('./facebook')
const { isLoggedIn } = require('./auth')

const router = express.Router()

router.get('/', function (req, res) {
  if (req.isAuthenticated())
    res.render('pages/profile.ejs', {
      user: req.user
    })
  else res.render('pages/index.ejs')
})

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

router.get('/error', isLoggedIn, function (req, res) {
  res.render('pages/error.ejs')
})

router.use('/google', google)
router.use('/facebook', facebook)

module.exports = router
