//app/models/todo.server.model.js

//grab modules

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//validation
function validateLength (v){
        return v.length <= 15;
}


var TodoObject = {
	title: {
	    type: String,
        default: 'To DO',
	    trim: true,
        required: true
	    // validate: (validateLength, 'Le titre ne peut exceder plus de 15 caratères')
	},
	descriptions: {
	   type: Array,
	   default: []
	},
	createdAt: {
	    type: Date,
		default: new Date()
	},
	isDo: {
		type: Boolean,
		default: false
	},
	createdBy: {
		type: Object,
		default: {
			alias: "JohnDoe",
			name: "Doe",
			surname: "John"
		}
	}
}
module.exports = mongoose.model("Todo", new Schema(TodoObject), "todo");
