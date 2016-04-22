var app = angular.module("myApp", []);


//declare and implement controller
var MyController = function ($scope) {
    $scope.message = "Hello!";
    
    $scope.updateResult = function (theData) {
        console.log("updateResult called")
        $scope.result = theData;
    };
};

app.controller("MyController", MyController); //register
