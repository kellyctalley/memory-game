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
var cards;
var cardData = [];
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




///////
//flip on click
/*
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
})();*/
});




//////////
//creates click function for card
$(function () {

  var selectedCard = null;
  var totalAttempts = 0;
  var totalMatches = 0;

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
          console.log(totalAttempts);
          // check matched cards to number of cards total
          // did they win?
        } else {
          card.addClass("flipped");
          console.log("no match");
          totalAttempts += 1;
          console.log(totalAttempts);
          setTimeout(function () {
            card.removeClass("flipped");
            selectedCard.removeClass("flipped");
            selectedCard = null;
          }, 500);
        }
      } else {
        card.removeClass("flipped");
        selectedCard = null;
      }
    }

/*
    if (!isFirstClick) {
      var src1 = front.attr("src");
      console.log("src1");
      console.log(src1);
      isFirstClick = true;
    } else {
      var src2 = front.attr("src");
      console.log("src2");
      console.log (src2);
    }*/

    


  });
});


//card is clicked
  //if no info is stored, it is first click

//if first click
  //src info is stored in variable
//if second click
  //src info is stored in variable and compared to first variable

//if cards do not match
  //cards turn over after 2-3 seconds
  //attempt is logged to attempts count
//if cards match
  //cards stay turned over
  //attempt is logged to attempts count
  //match is logged to matches count





//just in case//
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