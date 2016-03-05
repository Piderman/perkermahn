'use strict';

// todo: move to conf?
window.API_ROUTE = 'http://pokeapi.co/api/v2/';

var Services = angular.module('Services', ['ngSanitize']);
var Type = Type = angular.module('Type', []);

angular.module('pkmn', ['Services', 'Type']);
