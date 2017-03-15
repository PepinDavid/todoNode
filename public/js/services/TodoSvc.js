// public/js/services/TodoSvc.js

angular.module('TodoSvc', []).factory('Todo', ['$http', function($http){
	return {
		get: function(){
			return $http.get('/api/todos');
		},
		create: function(){
			return $http.post('/api/todos');
		},
		update: function(id){
			return $http.put('/api/todos'+id);
		},
		delete: function(id){
			return $http.delete('/api/todos'+id);
		}
	}
}]);