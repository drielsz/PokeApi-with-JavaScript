function Get(yourUrl) {
  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET", yourUrl, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById("authors");

var url = Get("https://pokeapi.co/api/v2/pokemon");
var JSONurl = JSON.parse(url);
var ArrayJson = Array(JSONurl);
var ResultsJson = ArrayJson[0].results;

for (let i = 0; i < ResultsJson.length; i++) {
  var linkPokemon = ResultsJson[i].url;
  fetch(linkPokemon)
    .then((resp) => resp.json())
    .then(function (data) {
      let authors = data.sprites.front_default;
      console.log(authors)
      let li = createNode("li");
      li.style.cssText = "list-style: none"

      let img = createNode("img");
      
      img.style.cssText = "width: 150px; height: 150px"

      let span = createNode("span");
      span.style.cssText = "font-size: 25px"

      img.src = authors;

      span.innerHTML = `${ResultsJson[i].name}`;

      append(li, img);
      append(li, span);
      append(ul, li);
    })
    .catch(function (error) {
      console.log(error);
    });
}
