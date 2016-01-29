angular.module('starter.controllers', [])

.controller('StudentsCtrl', function($scope) {
    $scope.title = '<div class="round-icon"><i class="icon ion-person-stalker"></i></div>';
})
.controller('StudentDetailsCtrl', function($scope,$stateParams) {
    $scope.id = $stateParams.id;
    $scope.age = $stateParams.age;
})
.controller('ClassesCtrl', function($scope, $state) {
    $scope.title = '<div class="round-icon"><i class="icon ion-university"></i></div>';
    $scope.gotoStudents = function() {
        $state.go('app.students');
    }
})
app.controller('AppCtrl', function($scope, $rootScope,$ionicLoading, $timeout) {
    $rootScope.$on('$stateChangeSuccess', function(event,toState, toParams, fromState, fromParams) {
        if (toState.name == 'app.classes.details')
            return;
        $ionicLoading.show({
            template: '<b>Previous state:</b> ' + fromState.name + '<br/><b>Current state</b>: ' + toState.name,
            noBackdrop: true
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 1000);
    });
})
.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
