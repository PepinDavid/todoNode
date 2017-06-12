//app/models/optionsSchema.js

//module for

var validateLength = function(v, maxLen){
	var max = maxLen || 15;
	return v.length <= max;
};

exports = {
	createdAt: {
	    type: Date,
		default: new Date()
	},
    validateLength: validateLength
};
