// public/appRoutes.js

angular.module('appRoutes', [])
.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		//home page
		.when('/',{
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		//todo page that will use the TodoController
		.when('/todos',{
			templateUrl: 'views/todo.html',
			controller: 'TodoController'
		});

	$locationProvider.html5Mode(true);
	
}]);