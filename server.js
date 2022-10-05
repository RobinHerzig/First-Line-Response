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
// const MongoClient = require('mongodb').MongoClient
// dateTime = require('node-datetime')
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


///////////////////////////////////////////////////


// let db,
//     dbConnectionStr = process.env.DB_STRING,
//     dbName = 'CAD'

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`)
//         db = client.db(dbName)
//     })
    

// Load homepage

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html')
// })

// // Load CAD

// app.get('/cad',(req, res)=>{
//     db.collection('calls').find().toArray()
//     .then(data => {
//         res.render('cad.ejs', { info: data })
//     })
//     .catch(err => console.log(err))
// })

// // Create new call

// app.post('/createCall', (req, res) => {
//     const dt = dateTime.create()
//     const date = dt.format('Y-m-d')
//     const time = dt.format('H:M:S')

//     db.collection('calls').insertOne({
//         date: date,
//         time: time,
//     })
//     .then(data => {
//         console.log('Created new call')
//         res.json(data)
//     })
//     .catch(err => console.log(err))
// })

// // Display selected call

// app.get('/displaySelectedCall', (req, res) => {
//     db.collection('calls').find().toArray()
//     .then(data => {
//         console.log('Displayed selected call')
//         res.json(data)
//     })
//     .catch(err => console.log(err))
// })

// // Save selected call

// app.put('/saveSelectedCall', (req, res) => {
//     const callInfoDataObject = {}
//     const dt = dateTime.create()
//     const date = dt.format('Y-m-d')
//     const time = dt.format('H:M:S')
//     const timeStamp = date + ' ' + time
//     for (key in req.body) {
//         if (key === 'newNote' && req.body[key] !== '') {
//             callInfoDataObject[`callNotesObject.${timeStamp}`] = time + ': ' + [req.body[key]] // Create embedded document for call notes
//         }
//         else {
//             callInfoDataObject[key] = req.body[key] // Iterate through the request body, create an object out of key/value pairs
//         }
//     }
//     db.collection('calls').updateOne({ "_id": ObjectId(req.body.id)}, {$set: callInfoDataObject})
//     .then(data => {
//         console.log(callInfoDataObject)
//         console.log('Saved selected call')
//         res.json('Saved selected call')
//     })
//     .catch(err => console.log(err))
// })

// // Delete selected call

// app.delete('/deleteSelectedCall', (req, res) => {
//     db.collection('calls').deleteOne({ "_id": ObjectId(req.body.id)})
//     .then(data => {
//         console.log('Deleted selected call')
//         res.json('Deleted selected call')
//     })
//     .catch(err => console.log(err))
// })