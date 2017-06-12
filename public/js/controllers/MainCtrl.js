// public/js/controllers/MainCtrl.js

angular.module('MainCtrl', []).controller('MainController', ['$scope', 'AuthSvc', '$location', function($scope, AuthSvc, $location){

        $scope.$watch(AuthSvc.isLoggedIn, function(value, oldValue){
                if(!value && oldValue){
                        console.log('Disconnect');
                        $location.path('/login');
                }
                if(value){
                        console.log('Connect');
                        //faire quelques choses si user connecté;
                }
                $scope.user = value;
        }, true);

}]);
