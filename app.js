const express =  require('express');
const mongoose = require('mongoose');
const expressHbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const Handlebars = require('handlebars');
const session = require('express-session');
const Logger = require('morgan');
const passport = require('passport');
const validator = require('express-validator');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);


const routes = require('./routes/index');
const userRoutes =  require('./routes/user');

const app = express();

// connect to mongo db database
 mongoose.connect('mongodb://localhost:27017/shopping');
     console.log('connected to database'); 
// require config/passport file
require('./config/passport');

// configure a port number
const port = 3000;

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extented: true }));

// congifure validator middleware
app.use(validator());

//configure cookie-parser
app.use(cookieParser());

//configure express-sesion
app.use(session({secret: 'mysupersecret',
 resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: { maxAge: 180 * 60 * 1000 }
}));

//configure flash package
app.use(flash());

// initialize passport
app.use(passport.initialize());
//configure passport to use session
app.use(passport.session());

// static files setup
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next){
    // make authentication available to all views
    res.locals.login = req.isAuthenticated();
    // make session available to views for handlebars accessibility
    res.locals.session = req.session;
    next();
});

// configure morgan logger 
// app.use(logger("short"));

app.use('/user', userRoutes);
app.use('/', routes);


//catch 404 and forward to error handler
app.use(function(req, res, next){
    let err = new Error('Not Found');
    err.status = 404;
});

// 

// configure server to listen for port
app.listen(port, () => 
    console.log(`app listening on port ${port}`));