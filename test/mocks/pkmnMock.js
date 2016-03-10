var rEndpoint = {
  all :/pokemon\?limit/,
  byName : /pokemon\/gastly/,
  byId : /pokemon\/\d+$/,
  fail : /pokemon\/canta-nope$/,
  image: /media\/sprites/
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
    ],
    "sprites" : {
      "front_default" : "http://pokeapi.co/media/sprites/pokemon/92.png"
    }
  },
  byId: {
    "id": 25,
    "name": "pikachu",
    "types": [
      {"slot": 1, "type": {"name": "electric"} }
    ],
    "sprites" : {
      "front_default" : "http://pokeapi.co/media/sprites/pokemon/25.png"
    }
  },
  fail: {
    "detail": "Not found."
  }
};


var mockPkmn = {
  endPoint: rEndpoint,
  results: pkmnResults
};