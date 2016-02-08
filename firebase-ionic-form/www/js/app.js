// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'firebase'])

app.run(function ($ionicPlatform, $firebaseArray, $timeout) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });


});

app.controller('FormCtrl', function ($scope, $firebaseArray) {
    var ref = new Firebase('https://ionicjpebook.firebaseio.com/transactions/');
    $scope.transactions = $firebaseArray(ref);
    $scope.formData = {};
    $scope.data = {
        completed: false,
        currentSlide: 0
    };
    // If user changes slide, make notification disappear
    $scope.$watch('data.currentSlide',
    function(newVal, oldVal) {
        if ((newVal < 2) && (oldVal == 2))
            $scope.data.completed = false;
    })
    $scope.submit = function() {
        // Check if the form is "dirty" or not as user must fill out something
        if (angular.equals({}, $scope.formData)) {
            alert("Your form is empty");
        } else {
            // Add the entire $scope.formData object to Firebase and reset it
            $scope.transactions.$add($scope.formData).
            then(function(res) {
                $scope.formData = {};
                $scope.data.completed = true;
                // Mark "completed" to show the notificationin view
              });
        }
    };
});

