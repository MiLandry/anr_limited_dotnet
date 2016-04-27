var app = angular.module("myApp", []);


//declare and implement controller
var MyController = function ($scope, $http)
{

    var onUserComplete = function (response)
    {
        $scope.data = response.data;
    };

    var onError = function(reason)
    {
        $scope.error = "Could not fetch the user";
    };

    $http.get("http://api.github.com/users/hamsterofdark")
    .then(onUserComplete, onError);




    $scope.updateResult = function (theData) {
        console.log("updateResult called")
        $scope.result = theData;
    };
};

app.controller("MyController", MyController); //register
