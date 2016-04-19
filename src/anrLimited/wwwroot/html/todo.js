var app = angular.module("myApp", TodoController)

function TodoController($scope) {
    $scope.totalTodos = 4;

    $scope.todos = [
	{ text: "learn Angular", status: false },
	{ text: "buy groceries", status: false }
    ]

}
