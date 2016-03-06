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
    $httpBackend.when('GET', mockTypes.endPoint.water).respond(mockTypes.results.water);
    $httpBackend.when('GET', mockTypes.endPoint.normal).respond(mockTypes.results.normal);
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
    ctrl.getOpponentInfo('blastoise');
    $httpBackend.flush();

    expect($scope.opponent.id).toBe(9);
    expect($scope.opponent.name).toBeTruthy(true);
    expect($scope.opponent.types.length).toBeGreaterThan(0);

    $scope.opponent = {};
    ctrl.getOpponentInfo('canta-nope');
    $httpBackend.flush();
    expect($scope.opponent.name).toBeUndefined();
  });

  it('should load oppenent by ID', function () {
    ctrl.getOpponentInfo('25');
    $httpBackend.flush();

    expect($scope.opponent.id).toBeTruthy();
    expect($scope.opponent.name).toBe('pikachu');
    expect($scope.opponent.types.length).toBeGreaterThan(0);
  });

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
