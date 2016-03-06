var rEndpoint = {
  water :/type\/water/,
  normal : /type\/normal/
};

var typeResults = {
  water : {
    "name": "water",
    "damage_relations": {
      "no_damage_to": [],
      "half_damage_to": [{"name" : "grass"}],
      "double_damage_to": [{"name" : "ground"}, {"name" : "rock"}, {"name" : "fire"}],
      "no_damage_from": [],
      "half_damage_from": [{"name" : "steel"}],
      "double_damage_from": [{"name" : "electric"}]
    }
  },
  // good for no damage
  normal : {
    "name": "normal",
    "damage_relations": {
      "no_damage_to": [{"name": "ghost"}],
      "half_damage_to": [{"name": "rock" }, {"name": "steel" } ],
      "double_damage_to": [],
      "no_damage_from": [{"name": "ghost"} ],
      "half_damage_from": [],
      "double_damage_from": [{"name": "fighting"}]
    }
  }
};


var mockTypes = {
  endPoint: rEndpoint,
  results: typeResults
};