'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('competitions', {
    url: '/competitions',
    template: '<competitions></competitions>'
  });
}
