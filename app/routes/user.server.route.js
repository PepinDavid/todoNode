// app/routes/user.server.route.js

//grab controllers
var user = require('../controllers/user.controller.server');
var log = require('../controllers/log.controller.server');
//export routing
module.exports = function(router){

        router.route('/users')
                .get(log.isLogin, user.list)
                .post(log.notUser, user.create);

        router.route('/users/:user_id')
                .get(log.isLogin, user.read)
                .put(log.isLogin, user.update)
                .delete(log.isLogin, user.remove);
}
