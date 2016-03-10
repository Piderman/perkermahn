'use strict';

// todo: move to conf?
window.API_ROUTE = 'http://pokeapi.co/api/v2/';

var Services = angular.module('Services', ['ngSanitize']);
var Pokemon = Pokemon = angular.module('Pokemon', []);

angular.module('pkmn', ['Services', 'Pokemon']);
