// app/controllers/log.controller.server.js

var User = require('../models/user.model.server');

//Middleware

exports.UserExist = function(req, res, next) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err)
            return res.status(400).send(err);
        if (!user)
            return res.status(200).send({
                message: 'user not found'
            });
        else
            return res.status(200).send({
                message: 'user exist'
            });
    })
};

exports.EmailExist = function(req, res, next) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err)
            return res.status(400).send(err);
        if (!user)
            return res.status(200).send({
                message: 'user not found'
            });
        else
            return res.status(200).send({
                message: 'user exist'
            });
    })
};

exports.isUser = function(req, res, next) {
    var u = req.body.username;
    /*if(u.indexOf('@') > -1){
        User.findOne({email: u}, function(err, user){
            if(err)
                return res.status(400).send(err);
            if(!user)
                return res.status(200).send({message: 'user not found'});
            else
                next();
        })
    }else{*/
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err)
            return res.status(400).send(err);
        if (!user)
            return res.status(200).send(
                'user not found'
            );
        else
            next();
    })
//}
};

exports.notUser = function(req, res, next) {
    var u = req.body.username;
    if (u.indexOf('@') > -1) {
        User.findOne({
            email: req.body.username
        }, function(err, user) {
            if (err) {
                return res.status(400).send(err)
            } else {
                if (!user) {
                    next();
                } else {
                    return res.json({
                        mess: 'user exists yet',
                        success: false
                    });
                }
            }
        });
    } else {
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) {
                return res.status(400).send(err)
            } else {
                if (!user) {
                    next();
                } else {
                    return res.json({
                        mess: 'email already uses',
                        success: false
                    });
                }
            }
        });
    }
};

exports.login = function(req, res) {
    //////////////////////a pofiné !!!!!!!!!!
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        user.comparePassword(req.body.password, function(err, isMatched) {
            if (err) {
                return res.status(400).send(err)
            } else {
                if (isMatched) {
                    req.session.user = user;
                    return res.json({
                        mess: 'Welcome ' + user.username,
                        success: true,
                        status: 200,
                        user: req.session.user
                    })
                } else {
                    return res.json({
                        mess: 'Invalid username or password',
                        success: false
                    })
                }
            }
        });
    });
};

exports.isLogin = function(req, res, next) {
    if (req.session && req.session.user) { //check if session and session.user exist
        User.findOne({ //check if session.user exist in db
            username: req.session.user.username,
            email: req.session.user.email
        }, function(err, user) {
            if (err)
                return res.status(400).send(err)
            if (!user) {
                req.session.reset();
                return res.json({
                    mess: 'You are not login',
                    success: false
                })
            } else {
                next();
            }
        });
    } else {
        return res.json({
            mess: 'You are not login',
            success: false
        })
    }
}
