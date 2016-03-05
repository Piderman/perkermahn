'use strict';

angular.module('Services')
  .service('infoServices', ['$http', function($http) {
    this.getPkmnByName = function (name) {
      return $http({
        method: 'GET',
        url: API_ROUTE + 'pokemon/' + name
      })
    };

    this.getTypeByName = function (name) {
      return $http({
        method: 'GET',
        url: API_ROUTE + 'type/' + name
      })
    };
  }]);
