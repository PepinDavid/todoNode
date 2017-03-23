//grab model
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUser = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
      if(err) res.send(success: false, error: err);
      res.json({success: true, user: user});
  });
};

exports.putUser = function(req, res) {
    User.findById(req.body.user_id, function(err, user) {
        if(err) res.send(success: false, error: err);
        user.username: req.body.username;
        user.password: req.body.password;

        user.save(function(err) {
            if(err) res.send(success: false, error: err);
            res.json({success: true, user: user});
        });
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find({}, function(err, users) {
      if(err) res.send(success: false, error: err);
      res.json({success: true, user: users});
  });
};

// Create endpoint /api/user for GET
exports.getUser = function(req, res) {
  User.findById(req.body.user_id, function(err, users) {
      if(err) res.send(success: false, error: err);
      res.json({success: true, user: users});
  });
};
