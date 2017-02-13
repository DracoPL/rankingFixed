'use strict';

import angular from 'angular';

export default angular.module('ranking.competitions')
  .factory('competitionModel', function (Restangular) {
    Restangular.extendModel('competitions', function (model) {
        return model;
    });

    return Restangular.all('competitions');
  });
