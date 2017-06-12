// app/controllers/user.server.controller.js

var User = require('../models/user.model.server');

exports.list = function(req, res) {
    //use mongoose to get all users in the db
    User.find().exec(function(err, users) {
        //if there is an error retrieving, send the error
        //nothing after res.send(err) will execute !!!!
        if (err) {
            return res.status(400).send(err);
        } else {
            res.status(201).json(users) //return all users in JSON format
        }
    });
};

exports.read = function(req, res) {
    User.findById(req.params.user_id)
        .exec(function(err, users) {
            if (err) {
                res.status(400).send(err);
            } else {
                if (!users) {
                    return res.status(404).send('user not found');
                } else {
                    res.json(users);
                }
            }
        });
};

exports.create = function(req, res) {
    var user = new User(); // create a new instance of the User model
    //get request body
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    // save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            mess: 'user created !'
        });
    });
};

exports.update = function(req, res) {
    //use mongoose to get single user we want
    User.findById(req.params.user_id)
        .exec(function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                if (!users) {
                    return res.status(404).send('user not found');
                } else {
                    user.comparePassword(req.body.password, function(err, isMatch) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            if (!isMatch) {
                                res.json({
                                    mess: 'mot de passe incorrect'
                                })
                            } else {
                                //save the user
                                user.username = req.body.username;
                                user.password = req.body.password;
                                user.save(function(err) {
                                    if (err)
                                        res.send(err);

                                    res.json({
                                        mess: 'user updated !'
                                    });
                                    $
                                });
                            }
                        }
                    });
                }
            }
        });
};

exports.remove = function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {

        if (err)
            res.send(err);

        res.json({
            mess: 'User deleted !'
        });
    });
}
