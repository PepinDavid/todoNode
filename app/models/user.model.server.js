//app/models/user.model.server.js

//grag module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

//define user
var User = {
    username: {
        type: String,
        trim: true,
        required: 'Il vous faut un pseudo'
    },
    email: {
        type: String,
        trim: true,
        required: 'Il faut une adresse mail',
        unique: true
    },
    password: {
        type: String,
        required: 'Il faut un mot de passe'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    modifiedAt: {
        type: Date,
        default: new Date()
    }
};

UserSchema = new Schema(User);

//MiddleWare pour automatiquement hasher le mot de passe avant de le sauver
//dans la DB

UserSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified('password'))
        return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err)
            return err;

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err)
                return err;

            user.password = hash;
            next();
        });
    });
});

//ajout d'une methode pour comparait le mot de passe sauver et le mot de passe
//lors de la connexion

UserSchema.methods.comparePassword = function(candidatePasswd, cb){
    bcrypt.compare(candidatePasswd, this.password, function(err, isMatch){
        if(err)
            return err;

        cb(null, isMatch)
    })
};

module.exports = mongoose.model('User', UserSchema, 'users');
