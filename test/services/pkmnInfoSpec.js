// scaffold for angulars
var pkmnInfo;
var $httpBackend;

describe('service: Pkmn Info', function() {
  beforeEach(module('pkmn'));

  beforeEach(inject(function(_infoServices_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;

    // $httpBackend.when('GET', mockPkmn.endPoint.byName).respond(mockPkmn.results.name);
    // $httpBackend.when('GET', mockPkmn.endPoint.byId).respond(mockPkmn.results.id);
    // $httpBackend.when('GET', mockPkmn.endPoint.fail).respond(mockPkmn.results.fail);

    pkmnInfo = _infoServices_;
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get pkmn by name');

  it('should get pkmn by id');
});
