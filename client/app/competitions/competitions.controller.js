import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './competitions.routes';
 
export class CompetitionsComponent {

  /*@ngInject*/
  constructor($http, $timeout) {
    this.$http = $http;
    this.timeout = $timeout;
    this.competitions = [];
  }

  fetchCompetitions() {
    var ctrl = this;
    ctrl.loadingCompetitions = true;
    ctrl.timeout(function(){
      ctrl.$http.get('/api/competitions').then(response => {
        ctrl.loadingCompetitions = false;
        ctrl.competitions = response.data;
      });
    }, 650);
  }

  $onInit() {
    this.fetchCompetitions();
  }
}

export default angular.module('ranking.competitions', [uiRouter])
  .config(routing)
  .component('competitions', {
    templateUrl: 'app/competitions/competitions.html',
    controller: CompetitionsComponent
  }).name;


