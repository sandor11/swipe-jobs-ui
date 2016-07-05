(function(angular) {
    'use strict';

    angular.module('webApp').controller('jobController', ['$scope', 'data',
        function($scope, data) {
            $scope.job = data;
        }
    ]); 
})(window.angular);