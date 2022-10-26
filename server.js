const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require("method-override")
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const demoRoutes = require('./routes/demo')
const PORT = 8000

// .ENV config
require('dotenv').config({path: './config/.env'})

// Connect to database
connectDB()

// EJS as view engine
app.set('view engine', 'ejs')

// Static folder
app.use(express.static('public'))

// Body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Use forms for PUT and DELETE
app.use(methodOverride("_method"))

// Logging
app.use(logger('dev'))

// Passport config
require('./config/passport')(passport)

// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Flash messages for errors
app.use(flash())

// Routes
app.use('/', homeRoutes)
app.use('/demo', demoRoutes)

// Server
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running, access via 'localhost:${PORT}'.`)
})