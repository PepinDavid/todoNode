// app/controllers/todo.server.controller.js

var Todo = require('../models/todo.model.server');

exports.list = function(req, res) {
    //use mongoose to get all todos in the db
    Todo.find({
        createdBy: req.session.user._id
    }).exec(function(err, todos) {
        //if there is an error retrieving, send the error
        //nothing after res.send(err) will execute !!!!
        if (err) {
            return res.status(400).send(err);
        } else {
            res.json(todos) //return all todos in JSON format
        }
    });
};

exports.read = function(req, res) {
    Todo.findById({
            _id: req.params.todo_id,
            createdBy: req.session.user._id
        })
        .exec(function(err, todos) {
            if (err) {
                res.status(400).send(err);
            } else {
                if (!todos) {
                    return res.status(404).send('todo not found');
                } else {
                    res.json(todos);
                }
            }
        });
};

exports.create = function(req, res) {
    var todo = new Todo(); // create a new instance of the Todo model
    //get request body
    todo.title = req.body.title;
    //add user._id for created task, which will to be have him
    todo.createdBy = req.session.user._id;
    // save the todo and check for errors
    todo.save(function(err) {
        if (err)
            res.send(err);
        else
            res.json({
                mess: 'todo created !',
                success: true,
                todo: todo
            });


    });
};

exports.update = function(req, res) {
    //use mongoose to get single todo we want
    Todo.findById({
            _id: req.params.todo_id
        })
        .exec(function(err, todo) {
            if (err) {
                res.status(400).send(err);
            } else {
                if (!todo) {
                    return res.status(404).send('todo not found');
                } else {
                    if (req.body.titre)
                        todo.titre = req.body.titre;
                    //if req.body.pos exist
                    if (req.body.pos !== undefined) {
                        todo.descriptions.splice(req.body.pos, 1);
                    } else {
                        todo.descriptions.push(req.body.descriptions)
                    }
                    //save the todo
                    todo.save(function(err) {
                        if (err)
                            res.send(err);
                        else
                            res.json({
                                mess: 'todo updated !',
                                success: true,
                                todo: todo
                            });
                    });
                }
            }
        });
};

exports.remove = function(req, res) {

    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo) {

        if (err)
            res.send(err);

        res.json({
            mess: 'Todo deleted !'
        });
    });
}
