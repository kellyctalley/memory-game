//////////
//shuffles cards
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
function playGame() {
var cards;
var cardData = [];

  $(".welcome").hide();
  $(".card-game").show();

$.getJSON('/js/cards.json', function(data) {
  var firstCard, secondCard;
  for (var i = 1, total = data.length; i < total; i++) {
    firstCard = data[i];
    firstCard.id = i;
    cardData.push(firstCard);
    secondCard = $.extend({}, firstCard);
    secondCard.id = -i;
    cardData.push(secondCard);
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
      class: "card effect__click",
      "data-id": val.id
    });

    card.append(cardBackElement);
    card.append(cardFrontElement);

    cardGame.append(card);
  });
});

//////////
//creates click function for card
$(function () {

  var selectedCard = null;
  var totalAttempts = 0;
  var totalMatches = 0;

  $(".stats-box").append('<p class="stats">attempts: <span id="attempts">' + totalAttempts + '</span></p>');
  $(".stats-box").append('<p class="stats">matches: <span id="matches">' + totalMatches + '</span></p>');


  $(".card-game").on("click", ".card:not(.matched)", function (event) {
    var card = $(this);
    var front = card.find(".front");
    var back = card.find(".back");
    var cardId = card.data("id");
    var src = front.attr("src");

    if (!selectedCard) {
      selectedCard = card;
      console.log("src1");
      card.addClass("flipped");
    } else {
      if (selectedCard.data("id") !== cardId) {
        if (selectedCard.find(".front").attr("src") == src) {
          console.log("match");
          card.addClass("flipped");
          card.addClass("matched");
          selectedCard.addClass("matched");
          selectedCard = null;
          totalAttempts += 1
          totalMatches += 1;
          $("#matches").html(totalMatches);
          $("#attempts").html(totalAttempts);
          // check matched cards to number of cards total
          // did they win?
          if (totalMatches === cardData.length/2) {
            $(".card-game").hide();
            $(".you-win").show();
          }
        } else {
          card.addClass("flipped");
          console.log("no match");
          totalAttempts += 1;
          $("#attempts").html(totalAttempts);
          setTimeout(function () {
            card.removeClass("flipped");
            selectedCard.removeClass("flipped");
            selectedCard = null;
          }, 600);
        }
      } else {
        card.removeClass("flipped");
        selectedCard = null;
      }
    }

  });
});
}



$(function () {
 $(".you-win").hide();
 $(".card-game").hide();

 $(".start-game").on("click", function() {
  playGame();
 });

 $(".play-again").on("click", function() {
    $(".card-game").empty();
    $(".stats-box").empty();
    playGame();
  });

});