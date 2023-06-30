const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const routes = require('./route/index')

app.set('view engine', 'ejs')

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.set(
    'Cache-Control',
    'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
  )
  next()
})

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

app.use('/', routes)

const port = 3000

app.listen(port, () => {
  console.log(
    `🚀 App running at http://localhost:${port}\n🚨️ Environment: ${process.env.NODE_ENV}`
  )
})
