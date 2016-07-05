(function(angular) {
    'use strict';
    
    var webApp = angular.module('webApp', ['ui.router', 'ui.bootstrap']);

    webApp.factory('appConfig', [function () {
            function getEnv() {
                return 'development';
            }

            var schemas = {
                production: {
                },
                development: {
                    name: 'swipe-jobs-ui',
                    version: '0.0.1',
                    author: 'Sandor Agafonoff',
                    license: 'MIT License'
                }
            };

            return schemas[getEnv()];
        }
    ]);

    webApp.run(['$location', '$state', '$rootScope', '$timeout', '$window', 'appConfig',
        function ($location, $state, $rootScope, $timeout, $window, appConfig) {        
            $rootScope.appConfig = appConfig;
        }
    ]);
})(window.angular);
(function(angular) {
    'use strict';
    
    angular.module('webApp').directive('ngRepeatComplete', ['$rootScope', '$timeout',
        function ($rootScope, $timeout) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attr) {
                    if ($scope.$last) {
                        $timeout(function () {
                            $rootScope.$broadcast($attr.ngRepeatComplete, true);
                        });
                    }
                }
            };
        }]
    );
})(window.angular);
(function(angular) {
    'use strict';

    angular.module('webApp').controller('appController', ['$scope',
        function($scope) {
        }
    ]); 
})(window.angular);
(function(angular) {
    'use strict';

    angular.module('webApp').controller('jobController', ['$scope', 'data',
        function($scope, data) {
            $scope.job = data;
        }
    ]); 
})(window.angular);
(function(angular) {
    'use strict';

    angular.module('webApp').filter('shiftRange', function() {
        function validRange(shifts) {
            return shifts && shifts.length;
        }
        return function(shifts) {
            if (!validRange(shifts)) {
                return '';
            }
            var range = moment(shifts[0].startDate).format('ddd, MMM D');
            if (shifts.length > 1) {
                range += ' - ' + moment(shifts[shifts.length - 1].startDate).format('ddd, MMM D');
            }
            return range;
        }
    }).filter('shiftStartDay', function() {
        return function(shift) {
            if (!shift) {
                return '';
            }
            return moment(shift.startDate).format('ddd, MMM D');
        }
    }).filter('shiftStartTime', function() {
        return function(shift) {
            if (!shift) {
                return '';
            }
            return moment(shift.startDate).format('h:mm A');
        }
    }); 
})(window.angular);
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