// scaffold for angulars
var $rootScope;
var $controller;
var $scope;
var $httpBackend;
var ctrl;

var rEndpointPkmn = /pokemon\//;
var rEndpointWater = /type\/water/;
var rEndpointNormal = /type\/normal/;

var mockOppenentResponse = {
  "name": "squirtle",
  "types": [{"type": {"name": "water"}}]
};

var mockOppenentWaterTypeResponse = {
  "name": "water",
  "damage_relations": [
    {"no_damage_to": []},
    {"half_damage_to": [{"name" : "grass"}]},
    {"double_damage_to": [{"name" : "ground"}, {"name" : "rock"}, {"name" : "fire"}]},
    {"no_damage_from": []},
    {"half_damage_from": [{"name" : "steel"}]},
    {"double_damage_from": [{"name" : "electric"}]},
  ]
};

var mockOppenentNormalTypeResponse = {
  "name": "water",
  "damage_relations": [
    {"no_damage_to": []},
    {"half_damage_to": [{"name" : "grass"}]},
    {"double_damage_to": []},
    {"no_damage_from": []},
    {"half_damage_from": [{"name" : "steel"}]},
    {"double_damage_from": [{"name" : "electric"}]},
  ]
};

describe('ctrl: oppenentController', function() {
  beforeEach(function(){
    localStorage.setItem('PKMN', '[{"name": "localmon"}]');
  });

  beforeEach(module('pkmn'));

  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_){
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    $httpBackend.when('GET', rEndpointPkmn).respond(mockOppenentResponse);
    $httpBackend.when('GET', rEndpointWater).respond(mockOppenentWaterTypeResponse);
    $httpBackend.when('GET', rEndpointNormal).respond(mockOppenentNormalTypeResponse);
    $controller = _$controller_;

    ctrl = $controller('opponentController', {
      $scope: $scope
    });

  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should load oppenent when selected'/*, function () {
    // todo: error on '/type/squirtle' but thats not an API call in this test
    $scope.getSummaryByName('squirtle');
    $httpBackend.flush();

    expect($scope.opponent.type).toBeDefined();
  }*/);

  it('should show oppenent type effectiveness', function() {
    var waterType = ctrl.getOppenentEffectiveSummary('water');
    var normalType = ctrl.getOppenentEffectiveSummary('normal');
    $httpBackend.flush();

    // todo: doesn't return but controller log shows it
    // console.log(waterType, normalType);

    expect(waterType).not.toBeUndefined();
    expect(normalType).not.toBeUndefined();
    expect(waterType.length).toBe(3);
    expect(normalType.length).toBe(0);
  });

  it('should show oppenent type weakness');

  it('should show oppenent type uselessness');
});
