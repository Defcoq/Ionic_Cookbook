// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
   .state('app', {
       url: "/app",
       abstract: true,
       templateUrl: "templates/app.html",
       controller: "AppCtrl"
   })
   .state('app.students', {
       url: "/students",
       views: {
           'students': {
               templateUrl: "templates/students.html",
               controller: 'StudentsCtrl'
           }
       }
   })
.state('app.students.details', {
    url: "/details/:id/:age",
    views: {
        'details': {
            templateUrl: "templates/details.html",
            controller: 'StudentDetailsCtrl'
        }
    }
})
.state('app.classes', {
    url: "/classes",
    views: {
        'classes': {
            templateUrl: "templates/classes.html",
            controller: 'ClassesCtrl'
        }
    }
})
.state('app.classes.details', {
    url: "/details/:id"
});

    $urlRouterProvider.otherwise("/app/students");

});
