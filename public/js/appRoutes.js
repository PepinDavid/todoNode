// public/appRoutes.js

angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            //home page
            .when('/', {
                templateUrl: 'views/home.html'
            })

            //todo page that will use the TodoController
            .when('/todos', {
                templateUrl: 'views/todo.html',
                controller: 'TodoController'
            })
            .when('/todos/create', {
                templateUrl: 'views/todocreate.html',
                controller: 'TodoController'
            })
            .when('/todos/:id', {
                templateUrl: 'views/tododetail.html',
                controller: 'TodoDetailController'
            })

            //log page
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LogController'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'LogController'
            })

        $locationProvider.html5Mode(true);

    }])
    .run(['$rootScope', '$location', 'AuthSvc', function($rootScope, $location, AuthSvc) {
        $rootScope.$on('$routeChangeStart', function(event) {
            if ($location.path() === '/todos' || $location.path() === '/todos/create' || $location.path() === '/todos/:id') {
                if (!AuthSvc.isLoggedIn()) {
                    console.log('DENY');
                    event.preventDefault();
                    $location.path('/login');
                } else {
                    console.log('isLoggedIn')
                }
            } else {
                console.log('accept location')
            }
        });
    }]);
