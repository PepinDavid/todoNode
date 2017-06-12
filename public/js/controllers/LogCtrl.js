// public/js/controllers/LogCtrl.js

angular.module('LogCtrl', []).controller('LogController', ['$scope', 'AuthSvc', 'UserSvc',function($scope, AuthSvc, UserSvc){

        $scope.loginUser = function(user){
                if(user.username !== '' && user.password !== ''){
                        var username = user.username.trim();
                        var password = user.password.trim();
                        if(username.length > 0 && password.length > 0 ){
                                AuthSvc.login(username, password, function(data, status){
                                        $scope.response = data.mess;
                                })
                        }else{
                                $scope.response = 'Les champs sont vides !!!';
                        }
                }else{
                        $scope.response = 'Les champs sont vides !!!';
                }
        };

        $scope.registerUser = function(user){
                if(user.username !== '' && user.password !== '' && user.email !== '' && user.passwordVerif !== ''){
                        var username    = user.username.trim();
                        var email               = user.email.trim();
                        var password    = user.password.trim();
                        var passwordV   = user.passwordVerif.trim();
                        if(username.length > 0 && password.length > 0  && email.length > 0 && passwordV.length > 0 && passwordV == password){
                                UserSvc.create({username: username, password: password, email: email}, function(data, status){
                                        $scope.response = data.mess || data;
                                })
                        }else{
                                $scope.response = 'Les champs sont vides !!!';
                        }
                }else{
                        $scope.response = 'Les champs sont vides !!!';
                }
        }

}]);
