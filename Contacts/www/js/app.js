// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('tabs', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })
.state('tabs.find', {
    url: "/find",
    views: {
        'find-tab': {
            templateUrl: "templates/find.html"
        }
    }
})
.state('tabs.add', {
    url: "/add",
    views: {
        'add-tab': {
            templateUrl: "templates/add.html"
        }
    }
});
    $urlRouterProvider.otherwise("/tab/find");
})
.controller('ContactCtrl', function ($scope, $cordovaContacts) {

    $scope.contactFind = {
        "name": {
            "givenName": "Not",
            "familyName": "Available"
        },
        "phoneNumbers": [
        {
            "value": "Not Available",
            "type": ""
        }
        ],
        "emails": [
        {
            "value": "Not Available"
        }
        ]
    };
    $scope.contactSave = {
        "name": {
            "givenName": "Student",
            "familyName": "Ionic"
        },
        "phoneNumbers": [
        {
            "value": "(408) 100-2000",
            "type": "mobile"
        }
        ],
        "emails": [
        {
            "value": "youremail@example.com"
        }
        ]
    };

    $scope.pickContact = function() {
        $cordovaContacts.pickContact().then(function(result) {
            // Contact picked success
            console.log(result);
            $scope.contactFind = result;
        }, function(err) {
            // Contact picked error
            alert('There is an error picking contact.Please see console.log');
console.log(err);
        });
    };

    $scope.addContact = function() {
        $cordovaContacts.save($scope.contactSave).
        then(function(result) {
            // Contact saved success
            alert('The contact information has been saved');
            console.log(result);
        }, function(err) {
            // Contact saved error
            alert('There is an error saving contact.Please see console.log');
        console.log(err);
        });
    };



});




