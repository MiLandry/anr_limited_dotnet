(function ()
{

    var config = function ()
    {
        return {
            OOFWeight: .2
        }


    };

    // Angular plumbing stuff

    var module = angular.module("anrLimited");
    module.factory('$config', config);
})();
