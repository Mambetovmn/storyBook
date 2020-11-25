const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotEnv = require('dotenv')
const morgan = require('morgan')
const exhbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDb = require('./config/db')
const MongoStore = require('connect-mongo')(session)



// Load config file
dotEnv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)


const app = express()

// body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// connect to mongoDb
connectDb()


// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exhbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
app.set('view engine', '.hbs')

// Session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  })
)



// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/stories'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on ${process.env.NODE_ENV} made on port ${PORT}`))