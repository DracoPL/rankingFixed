'use strict';

import angular from 'angular';
import ngMaterial from 'angular-material';

angular.module('ranking.competitions')
  .directive('editMatch', ['$mdMedia', '$mdDialog', '$http', function ($mdMedia, $mdDialog, $http) {

    var FormController = ['$scope', function($scope) {
      $scope.closeDialog = function() {
        $mdDialog.hide();
      };

      $scope.saveMatch = function () {
        if(($scope.match.home.score.points + $scope.match.away.score.points) === 0) {
          $scope.pointsEqualZero = true;
        } else {
          console.log($scope.match);
          $scope.match.played = 1;
          $http.put('/api/matches/'+$scope.match._id, $scope.match).then(()=>{
            $mdDialog.hide();
            if ($scope.callback) {
              $scope.callback();
            }
          });
        }
      };

      $scope.updatePoints = function () {
        if ($scope.match.home.score.td > $scope.match.away.score.td) {
          $scope.match.home.score.points = 4;
          $scope.match.away.score.points = 0;

          if ($scope.match.home.score.td - $scope.match.away.score.td === 1) {
            $scope.match.away.score.points += 1;
          }
        }
        if ($scope.match.home.score.td < $scope.match.away.score.td) {
          $scope.match.home.score.points = 0;
          $scope.match.away.score.points = 4;

          if ($scope.match.away.score.td - $scope.match.home.score.td === 1) {
            $scope.match.home.score.points += 1;
          }
        }
        if ($scope.match.home.score.td === $scope.match.away.score.td) {
          $scope.match.home.score.points = 2;
          $scope.match.away.score.points = 2;
        }
      };
    }];

    return {
      template: '<md-button class="md-raised" ng-click="openDialog()">Edit Match</md-button>',
      restrict: 'EA',
      scope: {
        callback: '&callback',
        match: '=matchObject'
      },
      link: function (scope) {
        scope.openDialog = function() {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
          $mdDialog.show({
            controller: FormController,
            scope: scope,
            templateUrl: 'app/competitions/editMatch/editMatch.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            fullscreen: useFullScreen,
            preserveScope: true
          });
        };
      }
    };
  }]);
