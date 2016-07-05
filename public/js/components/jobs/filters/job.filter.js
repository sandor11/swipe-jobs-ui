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