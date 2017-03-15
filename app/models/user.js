//app/models/user.js
//grab the mongoose module

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//define our user model
//module.exports allows us to pass this to toher files when it is called
module.exports = mongoose.model('User', new Schema({
    username: {type: String, default: ''}
}), 'users');//collection
