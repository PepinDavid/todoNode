// app/routes/log.server.route.js

//grab controllers
var log = require('../controllers/log.controller.server');
//grab user model

module.exports = function(router){

        router.route('/user/login')
                .post(log.isUser, log.login);

        router.route('/user/logout')
                .get(function(req, res){
                        req.session.reset();
                        res.redirect('/');
                })
}
