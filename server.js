//server.js

//module ======================================

var express = require('express'),
app = express();
router = express.Router(),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
mongoose = require('mongoose'),
session = require('client-sessions');

//config ==========================================

//confige db
var db = require('./config/db');

//set port
var port = process.env.PORT || 8080;

//get all data/stuff from our mongodb
mongoose.Promise = global.Promise;
mongoose.connect(db.url);

//get all data of the body parameters
//parse in json
app.use(bodyParser.json());

//parse application/vnd.api+json as json
app.use(bodyParser.urlencoded( {extended: true} ));

//override with the X GTTP METHOD OVERRIDE headerin the req. Smul DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

//set static files location /public
app.use(express.static(__dirname + '/public'));

//set handling middleware for session
app.use(session({
    cookieName: 'session',
    secret:'secret answer+SALT',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true, //prevent borwser hs from accessing cookies
    ephemeral: true // deletes cookie when browser is closed
}));

//Middleware =================================================================
app.use(function(req, res, next){
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //console.log(ip)
    //console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// REGISTER OUR ROUTES ------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//routes =========================
//be careful at the range of you use router.
require('./app/routes/log.server.route')(router);
require('./app/routes/user.server.route')(router);
require('./app/routes/todo.server.route')(router);


//fontend routes =======================
//route to handle all angular requests, it's angular-route which will display diferrents views
app.get('*', function(req, res){
    res.sendfile('./public/index.html'); // load our public/index.html file
});

//start app ======================
app.listen(port)
console.log('Magic happend on port ', port);

//expose app
exports = module.exports = app;
