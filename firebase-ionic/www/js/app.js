// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'firebase']);
var ref = new Firebase('https://ionicjpebook.firebaseio.com/items/');


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

    // $firebaseArray is new in 1.0.0
    // Instructions to migrate from previous version:
    // https://www.firebase.com/docs/web/libraries/angular/migration-guides.html
    var items = $firebaseArray(ref);
    // Wait for items array to load from server
    items.$loaded().then(function (data) {
        console.log('Number of items = ' + data.length);
        // If there is no data, then add 100 items to the array
        if (data.length == 0) {
            for (var i = 0; i < 100; i++) {
                data.$add({
                    name: "Item " + i,
                    $priority: i // Priority is used to ensure they are displayed in order
                });
            }
        }
    })

});

app.controller('ItemCtrl', function($scope, $firebaseArray, $ionicModal, $ionicListDelegate) {
    $scope.items = $firebaseArray(ref);
    $scope.editedItem = {};
    $scope.items.$loaded().then(function(data) {
        // Start the priority value which is lower than previous
        // The lower the value, the higher it is appearing on the list
        $scope.newPriority = (data.length > 0)
        ? data[0].$priority - 1 : -1;
        console.log("Items have been loaded:");
        console.log(data);
    });
    // Load template for modal to edit an item
    $ionicModal.fromTemplateUrl('edit.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.add = function (val) {
        if (!val || val.length === 0 || !val.trim()) {
            alert("Your value is invalid");
        } else {
            $scope.items.$add({
                name: val,
                $priority: $scope.newPriority
            });
            $scope.newPriority--;
        }
    };
    $scope.edit = function (item) {
        $scope.editedItem = item;
        $scope.modal.show();
    };
    $scope.save = function () {
        $scope.items.$save($scope.editedItem);
        $scope.modal.hide();
        $ionicListDelegate.closeOptionButtons();
    };
    $scope.close = function () {
        $scope.modal.hide();
        $ionicListDelegate.closeOptionButtons();
    };
    $scope.delete = function (item) {
        $scope.items.$remove(item);
        $ionicListDelegate.closeOptionButtons();
    };

});
