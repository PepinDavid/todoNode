//app/models/todo.js
//grab the mongoose module

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//define our user model
//module.exports allows us to pass this to toher files when it is called
module.exports = mongoose.model('Todo', new Schema({
    titre: {type: String, default: ''},
    descriptions: { type: String, default: ''},
    createdAt : { type: Date, default: new Date()},
    modifiedAt: { type: Date, default: new Date()},
    isDo: {type: Boolean, default: false}
}), 'todo');//collection
