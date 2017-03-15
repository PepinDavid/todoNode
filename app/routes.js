// app/routes.js

//grab the models
var User = require('./models/user');
var Todo = require('./models/todo');

module.exports = function(app){
	
 	//server routes =========================
        //handle things like api calls
	//authentication routes
		//soon

	//sample api route for User--------------

	//route to handle all users
	app.get('/api/users', function(req, res){
	    //use mongoose to get all users in the db
	    User.find(function(err, users){
	        
			//if there is an error retrieving, send the error
			//nothing after res.send(err) will execute !!!!
			if(err)
			   res.send(err)

			res.json(users) //return all users in JSON format
	    });
	});

	//route to handle one user
	app.get('/api/users/:user_id', function(req, res){
	    //use mongoose to get single user in the db
	    User.findById(req.params.user_id, function(err, users){
	        
			if(err)
			   res.send(err)

			res.json(users) //return the user in JSON format
	    });
	});

	//route to handle creating goes here (app.post);
	app.post('/api/users/', function(req, res){
		// create a new instance of the User model
		var user = new User (); 

		//get request body 
		user.username = req.body.username;

		// save the user and check for errors
		user.save(function(err){
			if(err)
				res.send(err)

			res.json({mess: 'user created !'})
		});	    
	});

	//route to handle update a user
	app.get('/api/users/:user_id', function(req, res){
	    //use mongoose to get single user we want
	    User.findById(req.params.user_id, function(err, user){

			if(err)
			   res.send(err);

			user.username = req.body.username;
			//save the user
			user.save(function(err){
				if(err)
				   res.send(err);

				res.json({mess: 'user updated !'}); //return all users in JSON format				
			})			
	    });
	});

	//route to handle delete goes here too (app.delete);
	app.delete('/api/users/:user_id', function(req, res){
	    //use mongoose to get all users in the db
	    User.remove({
	    	_id: req.params.user_id
	    }, function(err, users){
	        
			if(err)
			   res.send(err);

			res.json({mess: 'user deleted !'});
	    });
	});
	
	//sample api route for Todo--------------
	//route to handle all todos
	app.get('/api/todos', function(req, res){
	    //use mongoose to get all todos in the db
	    Todo.find(function(err, todos){
	        
			//if there is an error retrieving, send the error
			//nothing after res.send(err) will execute !!!!
			if(err)
			   res.status(400).send(err);

			res.json(todos); //return all todos in JSON format
	    });
	});
	//route to handle one todo
	app.get('/api/todos/:todo_id', function(req, res){
	    //use mongoose to get single todo in the db
	    Todo.findById(req.params.todo_id, function(err, todos){
			if(err){
			   res.status(400).send(err);
			}else{
				if(!todos){
					return res.status(404).send('todo not found');
				}else{
					res.json(todos);
				}
			}
	    });
	});

	//route to handle creating one todo
	app.post('/api/todos/', function(req, res){
		var todo 			= new Todo (); // create a new instance of the Todo model
		//get request body 
		todo.titre 			= req.body.titre;
		todo.descriptions 	= req.body.descriptions;

		// save the todo and check for errors
		todo.save(function(err){

			if(err)
				res.send(err);

			res.json({mess: 'todo created !'});
		});	    
	});

	//route to handle update a todo
	app.put('/api/todos/:todo_id', function(req, res){
	    //use mongoose to get single todo we want
	    Todo.findById(req.params.todo_id, function(err, user){

			if(err)
			   res.send(err);

			todo.titre 			= req.body.titre;
			todo.descriptions 	= req.body.descriptions;

			//save the todo
			todo.save(function(err){
				if(err)
				   res.send(err);

				res.json({mess: 'user updated !'});			
			})			
	    });
	});

	//route to handle delete one todo
	app.delete('/api/todos/:todo_id', function(req, res){
	    //use mongoose to delete the todo we want
	    Todo.remove({
	    	_id: req.params.todo_id
	    }, function(err, users){
	        
			if(err)
			   res.send(err);

			res.json({mess: 'user deleted !'});
	    });
	});

	//fontend routes =======================
	//route to handle all angular requests, it's angular-route which will display diferrents views
	app.get('*', function(req, res){
	    res.sendfile('./public/index.html'); // load our public/index.html file
	});
};
