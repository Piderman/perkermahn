// scaffold for angulars
var $rootScope;
var $controller;
var $scope;
var $httpBackend;
var ctrl;

var mockOppenentResponse = {
  "name": "squirtle",
  "types": [{"type": {"name": "water"}}]
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

    // local storage
    $httpBackend.when('GET', mockPkmn.endPoint.all).respond(mockOppenentResponse);

    // pkmn lookup
    $httpBackend.when('GET', mockPkmn.endPoint.byName).respond(mockPkmn.results.byName);
    $httpBackend.when('GET', mockPkmn.endPoint.byId).respond(mockPkmn.results.byId);
    $httpBackend.when('GET', mockPkmn.endPoint.fail).respond(mockPkmn.results.fail);

    // effectiveness
    $httpBackend.when('GET', mockTypes.endPoint.electric).respond(mockTypes.results.electric);
    $httpBackend.when('GET', mockTypes.endPoint.poison).respond(mockTypes.results.poison);
    $httpBackend.when('GET', mockTypes.endPoint.ghost).respond(mockTypes.results.ghost);
    $controller = _$controller_;

    ctrl = $controller('opponentController', {
      $scope: $scope
    });

  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should load oppenent by name', function () {
    $scope.getOpponentInfo('gastly');
    $httpBackend.flush();

    expect($scope.opponent.id).toBe(92);
    expect($scope.opponent.name).toBeTruthy(true);
    expect($scope.opponent.types.length).toBe(2);

    $scope.opponent = {};
    $scope.getOpponentInfo('canta-nope');
    $httpBackend.flush();
    expect($scope.opponent.name).toBeUndefined();
  });

  it('should load oppenent by ID', function () {
    $scope.getOpponentInfo('25');
    $httpBackend.flush();

    expect($scope.opponent.id).toBeTruthy();
    expect($scope.opponent.name).toBe('pikachu');
    expect($scope.opponent.types.length).toBeGreaterThan(0);

  });

  it('should show oppenent summary for single-types', function() {
    $scope.getOpponentInfo('25');
    $httpBackend.flush();

    expect($scope.opponent.doubleDamageTo.length).toBeGreaterThan(0);
    expect($scope.opponent.halfDamageTo.length).toBeGreaterThan(0);
    expect($scope.opponent.noDamageTo.length).toBeGreaterThan(0);

    expect($scope.opponent.doubleDamageFrom.length).toBeGreaterThan(0);
    expect($scope.opponent.halfDamageFrom.length).toBeGreaterThan(0);
    expect($scope.opponent.noDamageFrom.length).not.toBeNull();

  });

  it('should show summary by type only', function( ){
    $scope.getTypeSummary(['poison']);
    $httpBackend.flush();
    expect($scope.opponent.halfDamageTo).toContain('rock');

    $scope.getTypeSummary('electric');
    $httpBackend.flush();
    expect($scope.opponent.doubleDamageTo).toContain('water');
    expect($scope.opponent.noDamageTo).toContain('ground');
  });

  it('should show oppenent summary by for dual-types', function(){
    $scope.getOpponentInfo('gastly');
    $httpBackend.flush();

    expect($scope.opponent.types.length).toBe(2);

    // should combine the arrays, separately are 2 and 5
    expect($scope.opponent.halfDamageFrom.length).toBeGreaterThan(5);
  });
});
