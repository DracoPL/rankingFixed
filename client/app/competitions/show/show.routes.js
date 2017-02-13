'use strict'; 

export default function routes($stateProvider) {
  'ngInject'

  $stateProvider.state('competitionsShow', {
        url: '/competitions/:competitionId',
        template: '<competitions-show></competitions-show>'
      });
};
