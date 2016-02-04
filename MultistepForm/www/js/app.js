// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.views.maxCache(0);
    $stateProvider
    .state('step1', {
        url: "/step1",
        data: {
            step: 1
        },
        templateUrl: "templates/step1.html",
        controller: 'Step1Ctrl'
    })
.state('step2', {
    url: "/step2",
    data: {
        step: 2
    },
    templateUrl: "templates/step2.html",
    controller: 'Step2Ctrl'
})
.state('step3', {
    url: "/step3",
    data: {
        step: 3
    },
    templateUrl: "templates/step3.html",
    controller: 'Step3Ctrl'
})
.state('done', {
    url: "/done",
    data: {
        step: 4
    },
    templateUrl: "templates/done.html",
    controller: 'DoneCtrl'
});
    $urlRouterProvider.otherwise("/step1");
})

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
.controller('AppCtrl', function($scope, $rootScope,
$ionicLoading, $timeout) {
    $scope.hideBackButton = false;
    $scope.data = {
        firstname: '',
        middlename: '',
        lastname: '',
        cell: '',
        email: '',
        comments: '',
        tos: false
    };
    $rootScope.$on('$stateChangeSuccess', function (event,toState, toParams, fromState, fromParams) {
        if ((toState.name == 'done') || (toState.name =='step1'))
            $scope.hideBackButton = true;
        else
            $scope.hideBackButton = false;
    });
})
.controller('Step1Ctrl', function ($scope) {
    $scope.step1Submitted = false;
    $scope.submit = function () {
        $scope.step1Submitted = true;
    }
})
.controller('Step1FormCtrl', function ($scope,$rootScope, $state) {
    var validate = $rootScope.$on('$stateChangeStart',function (event, toState, toParams, fromState,fromParams) {
        if (($scope.step1Form.$invalid) &&
        (toState.data.step > fromState.data.step))
            event.preventDefault();
    });
    $scope.$on('$destroy', validate);
})
.controller('Step2Ctrl', function ($scope) {
    $scope.step2Submitted = false;
    $scope.submit = function () {
        $scope.step2Submitted = true;
    }
})
.controller('Step2FormCtrl', function ($scope,$rootScope, $state) {
    var validate = $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState,
    fromParams) {
        if (($scope.step2Form.$invalid) && (toState.data.step> fromState.data.step))
            event.preventDefault();
    });
    $scope.$on('$destroy', validate);
})
.controller('Step3Ctrl', function($scope) {
    $scope.step3Submitted = false;
    $scope.submit = function() {
        $scope.step3Submitted = true;
    }
})
.controller('Step3FormCtrl', function($scope,$rootScope, $timeout) {
    $timeout(function() {
        $scope.step3Form.tos.$setValidity('agree',
        $scope.data.tos);
    });
    $scope.checkTos = function() {
        $scope.step3Form.tos.$setValidity('agree',
        $scope.data.tos);
    }
    var validate = $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState,fromParams) {
    if (($scope.step3Form.$invalid) && (toState.data.step > fromState.data.step))
        event.preventDefault();
});
    $scope.$on('$destroy', validate);
})
.controller('DoneCtrl', function($scope, $rootScope,$ionicHistory) {
    $scope.reset = function() {
        angular.copy({
            firstname: '',
            middlename: '',
            lastname: '',
            cell: '',
            email: '',
            comments: '',
            tos: false
        }, $scope.data);
    }
    var validate = $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState,fromParams) {
        $ionicHistory.clearHistory();
    });
    $scope.$on('$destroy', validate);

});


