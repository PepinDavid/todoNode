//server.js

//module =============================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

//controllers
var todoController = require('./controllers/todo.controller');
var userController = require('./controllers/user.controller')

//configuration =============================================================

//config files
var db = require ('./config/db');

//set out port
var port = process.env.PORT || 8070;

//connect to our mongoDB database
//uncomment when you enter your own credentials in config/db.js
mongoose.Promise = global.Promise;
mongoose.connect(db.url);


//Middleware =================================================================
//get all data/stuff of the body (POST) parameters
//parse application/json
app.use(bodyParser.json());

//parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}) );

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}) );

//override with the X-HTTP-Method-Override header in the req. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

//set the static files olcation /public/img will be /img for users
app.use(express.static(__dirname+'/public'));

app.use(function(req, res, next){
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip)
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//routes =========================
//Init route express
var router = express.Router();

//Todo endpoint
//create endpoint /todos
router.route('/todos')
    .get(todoController.getTodos)
    .post(todoController.postTodo);

//create endpoint /todos/todo_id
router.route('/todos/:todo_id')
    .get(todoController.getTodo)
    .put(todoController.putTodo)
    .remove(todoController.removeTodo);

//Users endpoint
//create endpoint /users
router.route('/users')
    .get(userController.getUsers)
    .post(userController.postUser);

//create endpoint /users/user_id
router.route('/users/:user_id').
    .get(userController.getUser)
    .put(todoController.putUser);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);

//start app ======================
app.use('/api', router);
app.listen(port)
console.log('Magic happend on port ', port);

//expose app
exports = module.exports = app;
