var rEndpoint = {
  all :/pokemon\?limit/,
  byName : /pokemon\/gastly/,
  byId : /pokemon\/\d+$/,
  fail : /pokemon\/canta-nope$/
};

var pkmnResults = {
  all : {
    "results": [
      {"name": "bulbasaur"},
      {"name": "ivysaur"},
      {"name": "venusaur"},
      {"name": "charmander"},
      {"name": "charmeleon"},
      {"name": "charizard"},
      {"name": "squirtle"},
      {"name": "wartortle"},
      {"name": "blastoise"},
      {"name": "caterpie"},
      {"name": "metapod"},
      {"name": "butterfree"},
      {"name": "weedle"}
    ]
  },
  byName: {
    "id": 92,
    "name": "gastly",
    "types": [
      {"slot": 2, "type": {"name": "poison"} },
      {"slot": 1, "type": {"name": "ghost"} }
    ]
  },
  byId: {
    "id": 25,
    "name": "pikachu",
    "types": [
      {"slot": 1, "type": {"name": "electric"} }
    ]
  },
  fail: {
    "detail": "Not found."
  }
};


var mockPkmn = {
  endPoint: rEndpoint,
  results: pkmnResults
};