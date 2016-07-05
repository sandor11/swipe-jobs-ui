(function(angular) {
    'use strict';
    
    angular.module('webApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/jobs');
            
            $stateProvider
                    .state('app', {
                        abstract: true,
                        templateUrl: './views/components/app/app.html',
                        controller: 'appController'
                    })
                    .state('app.jobs', {
                        url: '/jobs',
                        templateUrl: './views/components/jobs/jobs.html',
                        controller: 'jobController',
                        resolve: {
                            data: ['$http', function($http) {
                                return $http.get('data/mock.json').then(function(response) {
                                    return response.data;
                                })
                            }]
                        }
                    });

            $locationProvider.html5Mode(true);
        }
    ]);
})(window.angular);