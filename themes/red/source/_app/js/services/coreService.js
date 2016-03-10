angular.module('Services')
  /**
   * storage
   *
   * gets pkmn from local storage, requesting from API if not there
   * @return {array} pokemon from local storage
   */

  .service('coreStorage', ['$http', function($http) {
    var param = {
      limit: 900
    };

    var getPkmnFromAPI = function() {
      return $http({
        method: 'GET',
        url: API_ROUTE + 'pokemon',
        params: param
      });
    };

    var getPkmnFromLocal = function() {
      return JSON.parse(localStorage.PKMN);
    };

    var getPkmnPartyFromLocal = function() {
      return JSON.parse(localStorage.PKMN_party);
    };

    this.getAllPkmn = function() {
      var PKMN = localStorage.PKMN;

      if (!PKMN) {
        console.log('catching all the pokemon...');

        getPkmnFromAPI()
          .then(function(result) {
            var pkmns = JSON.stringify(result.data.results);

            localStorage.setItem('PKMN', pkmns);
            return getPkmnFromLocal();
          });

      } else {
        return getPkmnFromLocal();
      }
    };


    this.getParty = function() {
      var PKMN_party = localStorage.PKMN_party;

      if (!PKMN_party) {

      } else {
        return getPkmnPartyFromLocal();
      }
    };
  }]);