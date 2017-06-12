// public/js/services/UserSvc.js

angular.module('UserSvc', []).factory('UserSvc', ['$http', function($http) {
    return {
        get: function(cb) {
            return $http.get('/api/users')
                .then(function(data, status) {
                    cb(data, null);
                },function(data, status) {
                    cb(data, status)
                });
        },
        create: function(userData, cb) {
            return $http.post('/api/users', userData)
                .then(function(data, status) {
                    cb(data, null);
                },function(data, status) {
                    cb(data, status)
                });
        },
        update: function(id, userData, cb) {
            return $http.put('/api/users/' + id, userData)
                .then(function(data, status) {
                    cb(data, null);
                },function(data, status) {
                    cb(data, status)
                });
        },
        delete: function(id, cb) {
            return $http.delete('/api/users/' + id)
                .then(function(data, status) {
                    cb(data, null);
                },function(data, status) {
                    cb(data, status)
                });
        }
    }
}]);
