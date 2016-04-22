var app = angular.module("myApp", []);


//declare and implement controller
var MyController = function ($scope) {
    $scope.message = "Hello!";
};

app.controller("MyController", MyController); //register
