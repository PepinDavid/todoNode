//grab Schema
var Todo = require('../models/todo');

//GET api/todos
exports.getTodos = function(req, res){
    Todo.find({},function(err,todos){
        if(err) res.send(success: false, error: err);
        res.json(todos)
    })
};
//GET api/todos/:todo_id
exports.getTodo = function(req, res){
    Todo.findById(req.body.todo_id,function(err,todo){
        if(err) res.send(success: false, error: err);
        res.json(todo)
    })
};

//POST api/todos/:todo_id
exports.postTodo = function(req, res){
    var todo = new Todo();
    todo.title = req.body.title;
    todo.descriptions = req.body.descriptions;

    todo.save(function(err){
        if(err) res.send(success: false, error: err);
        res.json({success: true, todo: todo});
    })
};

//PUT api/todos/:todo_id
exports.putTodo = function(req, res){
    Todo.findById( req.body.todo_id}, function(err, todo){
        if(err) res.send(success: false, error: err);
        todo.title = req.body.title;
        todo.desc = req.body.descriptions,
        todo.modified = new Date();
        todo.isDo = req.body.isDo;

        todo.save(function(err){
            if(err) res.send(success: false, error: err);
            res.json({success: true, todo: todo});
        });
    });
}

//REMOVE api/todos/:todo_id
exports.removeTodo = function(req, res){
    Todo.findByIdAndRemove(req.body.todo_id, function(err){
        if(err) res.send(success: false, error: err);
        res.json({success: true, todo: ""});
    })
}
