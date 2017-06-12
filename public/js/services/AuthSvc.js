// public/js/services/TodoSvc.js

angular.module('AuthSvc', []).factory('AuthSvc', ['$http','$q','$timeout', function($http, $q, $timeout){
        var user = null;

        function isLoggedIn(){
                if(user){
                        return user;
                }else{
                        return false;
                }
        };

        function getUserStatus(){
                return user;
        };

        function login(username, password, cb){
                  // create a new instance of deferred
                var deferred = $q.defer();
                console.log(deferred)

                  // send a post request to the server
                  $http.post('api/user/login',
                    {username: username, password: password})
                    // handle success
                    .then (function (data) {
                      if(data.data.status === 200 && data.data.success){
                        console.log('isLog')
                        cb(data.data, status)
                        user = data.data.user;
                        deferred.resolve();
                      } else {
                        cb(data.data, status)
                        user = null;
                        deferred.reject(false);
                      }
                  },function (data) {
                        cb(data);
                            user = null;
                            deferred.reject(false);
                    });

                  // return promise object
                  return deferred.promise;
        };
        function logout(){
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('api/user/logout')
            // handle success
            .then(function (data) {
              user = null;
              deferred.resolve();
          },function (data) {
              user = null;
              deferred.reject();
            });

                // return promise object
                return deferred.promise;
        };

        return({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
        })
}]);
