// scaffold for angulars
var coreStorage;
var $httpBackend;

describe('service: coreStorage', function() {
  beforeEach(module('pkmn'));

  beforeEach(inject(function(_coreStorage_, _$httpBackend_) {
    localStorage.removeItem('PKMN');

    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', mockPkmn.endPoint.all).respond(mockPkmn.results.all);

    coreStorage = _coreStorage_;
  }));

  afterEach(function(){
    localStorage.removeItem('PKMN');

    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get pkmn from local storage', function(){
    localStorage.setItem('PKMN', '[{"name": "squirtle"}, {"name": "wartortle"}, {"name": "blastoise"} ]');
    var result = coreStorage.getAllPkmn();

    expect(Array.isArray(result)).toBe(true);
    expect(result[2].name).toBe('blastoise');

    // should still be from new fake local
    var additionalCall = coreStorage.getAllPkmn();
    expect(additionalCall[0].name).toBe('squirtle');
    expect($httpBackend.flush).toThrow();
  });

  it('should call api when there is no localStorage');
});
