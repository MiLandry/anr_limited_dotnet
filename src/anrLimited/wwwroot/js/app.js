var app = angular.module("anrLimited", []);

app.directive('imageonload', function ()
{
    return {
        restrict: 'A',
        link: function ($scope, element, attrs)
        {
            element.bind('load', function ()
            {
                
                $scope.$apply(attrs.imageonload);
            });
        }
    };
});