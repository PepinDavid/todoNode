// public/js/controllers/Todotrl.js

angular.module('TodoCtrl', []).controller('TodoController', ['$scope', 'TodoSvc', 'AuthSvc', function($scope, TodoSvc, AuthSvc) {
    var todos = []
    TodoSvc.get(function(data, status) {
        console.log(data.data)
        $scope.todos = data.data;
    })

    $scope.addTodo = function(todo) {
        console.log(todo)
        if (todo.title !== '') {
            var titre = todo.title.trim();
            if (titre.length > 1) {
                TodoSvc.create(todo, function(data, status) {
                    console.log(data.data)
                    var resp;
                    if (data.data.success) {
                        resp = data.data.mess;
                        $scope.todos.push(data.data.todo);
                    }else{
                        resp = data.data._message
                    }
                    $scope.response = resp;
                    $scope.formTodo.titre = '';
                })
            } else {
                $scope.response = 'Les champs sont vides !!!';
            }
        } else {
            $scope.response = 'Les champs sont vides !!!';
        }
    };

    $scope.removeTodo = function(index) {
        var todo = $scope.todos[index];
        TodoSvc.delete(todo._id, function(data) {
            $scope.todos.splice(index, 1);
        })
    };

}]).controller('TodoDetailController', ['$scope', '$routeParams', 'TodoSvc', function($scope, $routeParams, TodoSvc) {
    TodoSvc.read($routeParams.id, function(data, status) {
        $scope.todo = data.data;
        $scope.descriptions = data.descriptions;
    });

    $scope.addDetail = function(todo) {
        if (todo.descriptions !== undefined) {
            var description = todo.descriptions;
            if (description.trim() !== '') {
                TodoSvc.update($routeParams.id, todo, function(data, status) {
                    console.log(data)
                    if (data.data.success) {
                        $scope.todo.descriptions.push(description);
                    }
                    $scope.formTodo.descriptions = '';
                });
            }
        }
    };

    $scope.removeDescription = function(index) {
        var el = {};
        el.pos = index;
        TodoSvc.update($routeParams.id, el, function(data, status) {
            console.log(data)
            if (data.success) {
                $scope.descriptions.splice(index, 1);
            }
        })
    };

}]);
