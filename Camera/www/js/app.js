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
.controller('CameraCtrl', function ($scope, $cordovaCamera) {
    $scope.item = {
        data: "",
        imagePath: "Photo capture as Base64",
        destinationFILE_URI: false
    };

    $scope.clickToggle = function () {
        if ($scope.item.destinationFILE_URI)
            $scope.item.imagePath = "Photo capture as File URI";
        else
            $scope.item.imagePath = "Photo capture as Base64";
    }

    $scope.getPicture = function(sourceType) {
        var options = {
            quality : 50,
            allowEdit : true,
            correctOrientation: false,
            targetWidth: 640,
            targetHeight: 1080,
            destinationType: $scope.item.destinationFILE_URI ?
            Camera.DestinationType.FILE_URI :
            Camera.DestinationType.DATA_URL,
            sourceType : sourceType,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
            if ($scope.item.destinationFILE_URI) {
                $scope.item.data = imageData;
                $scope.item.imagePath = imageData;
            } else {
                $scope.item.imagePath = "Photo capture as Base64";
                $scope.item.data = "data:image/jpeg;base64," +imageData;
            }
            console.log(imageData);
        }, function (err) {
            alert('Unable to take picture');
        });
    }

});

