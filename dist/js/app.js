//////////
//creates shuffle function
/*
(function($){
 
    $.fn.shuffle = function() {

  var elements = this.get()
  var copy = [].concat(elements)
  var shuffled = []
  var placeholders = []

  // Shuffle the element array
  while (copy.length) {
    var rand = Math.floor(Math.random() * copy.length)
    var element = copy.splice(rand,1)[0]
    shuffled.push(element)
  }

  // replace all elements with a plcaceholder
  for (var i = 0; i < elements.length; i++) {
    var placeholder = document.createTextNode('')
    findAndReplace(elements[i], placeholder)
    placeholders.push(placeholder)
  }

  // replace the placeholders with the shuffled elements
  for (var i = 0; i < elements.length; i++) {
    findAndReplace(placeholders[i], shuffled[i])
  }

  return $(shuffled)

}

function findAndReplace(find, replace) {
  find.parentNode.replaceChild(replace, find)
}
 
})(jQuery);
*/

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



//////////
//loads cards from json file and shuffles
var cards;
var cardData = [];
$.getJSON('/js/cards.json', function(data) {
  var card;
  for (var i = 0, total = data.length; i < total; i++) {
    card = data[i];

    cardData.push(card, card);
  }

  // randomize the array
  shuffle(cardData);
  cards = $(cardData);

  var cardBackBase = $("<img />", {
    src: "images/images/back.jpg",
    class: "back"
  });

  var cardGame = $(".card-game");
  // cardGame.empty()

  cards.each(function (key, val) {
    var cardFrontElement = $("<img />", {
      src: val.image,
      class: "front"
    });

    var cardBackElement = cardBackBase.clone();

    var card = $("<div />", {
      class: "card effect__click"
    });

    card.append(cardBackElement);
    card.append(cardFrontElement);

    cardGame.append(card);
  });




///////
//flip on click
(function() {
  var cards = document.querySelectorAll(".card.effect__click");
  for ( var i  = 0, len = cards.length; i < len; i++ ) {
    var card = cards[i];
    clickListener( card );
  }

  function clickListener(card) {
    card.addEventListener( "click", function() {
      var c = this.classList;
      c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
    });
  }
})();
});




//////////
//creates click function for card
$(function () {
  $(".card-game").on("click", ".card", function (event) {
    var card = $(event.target);
    var front = $(this).find(".front");
    var back = card.find(".back");
    var src = front.attr("src");
    console.log(src);
    //console.log(card.attr("src"));
  });
});







//when they click
//  if info is not saved, it is the first click, so we save the info
//  if info is saved, it is the second click, so we compare
//  if it is a match ...
//  if it is not ... 
//  if they have them all, they win

// how to handle if they try to click the same element more than once

//first click store src info
//second will check if info stored and check for match
//if info