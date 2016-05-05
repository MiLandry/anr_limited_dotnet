(function ()
{
    var MainController = function ($scope, $cards, $timeout, $config)
    {

        $scope.deckList = [];
        $scope.sideboard = [];
        $scope.cardsPerBatch = 4;

        function indexOfCard(deckList, card)
        {
            for (var i = 0; i < deckList.length; i++)
            {
                if (deckList[i].code == card.code)
                {
                    return i;
                }
            }
            return -1;
        };



        /**
        *  This is the callback function for when a user clicks the select button to add that card to his deck
        */
        $scope.selectCard = function (card)
        {
            deckList = $scope.deckList;
            //otherwise we add one copy of the card to the deck list.  We need to set the quantity to 1,
            //because the raw "quantity" property stores the amount of copies of that card that ships with its containing product.
            card.quantity = 1;

            //if its an ID, add it to the list and tell the configuration which side and faction to use
            // initialize the sideboard
            if (card.type === "Identity")
            {
                $config.side = card.side;
                $config.faction = card.faction;
                $scope.sideboard = $cards.getStartingSideboard(card.side);
                $scope.cardsRemaining = 36;
                $scope.deckList.push(card);
            }

            //if the card is already in the deck list, then we increment that card by one and return
            else if (indexOfCard(deckList, card) > 0)
            {
                var i = indexOfCard(deckList, card);
                $scope.deckList[i].quantity++;

            }

            //otherwise, add the card to the deck list
            else
            {
                $scope.deckList.push(card);
            }

            //set the next batch of cards
            setNextBatch();
            return;
        };

        $scope.newCorpIDs = function (number)
        {
            $scope.currentCardBatch = [];
            $scope.deckList = [];
            $scope.sideboard = [];
            var ids = $cards.getCorpIDBatch(number);
            $scope.currentCardBatch = ids;

        }

        $scope.newRunnerIDs = function ()
        {
            $scope.currentCardBatch = [];
            $scope.deckList = [];
            $scope.sideboard = [];
            var ids = $cards.getRunnerIDBatch();
            $scope.currentCardBatch = ids;

        }

        var setNextBatch = function()
        {
            // Hide the entire batch area so that the user cannot accidently add multiple cards from the same batch
            $scope.cardAreasVisibility = 'hidden';
            $scope.cardsRemaining--;

            $scope.currentCardBatch = [];
            var theCards = $cards.getNewCardBatch($scope.cardsPerBatch);

            $scope.currentCardBatch = theCards;

            //now wait until the images have loaded


            //then reveal the new batch
            $timeout(revealcardAreas, 1000);
        }

        $scope.style = function()
        {

        };
        
        var revealBatchArea = function()
        {
            //$scope.batchVisibility = 'visible';
        }

        var revealcardAreas = function()
        {
            console.log("reveal card calls");
            $scope.cardAreasVisibility = 'visible';
        }

        $scope.revealCardArea = function (card)
        {
            var id = card.code;
            var selector = '#' + id;
            var currentBG = $(selector).css("visibility", "visible");
            //alert(currentBG);

        }

        $scope.setSideboard = function ()
        {
            $scope.sideboard = $cards.getStartingSideboard();
        }

        $scope.moveToSideboard = function(card)
        {
            deckList = $scope.deckList;
            //decremint decklist by one
            var i = indexOfCard(deckList, card)
            console.log(deckList[i]);
            deckList[i].quantity--;

            //increment sideboard by one
            SB = $scope.sideboard;
            var j = indexOfCard(SB, card);
            if (j >= 0)
            {
                SB[j].SBCount++;
            }
            else
            {
                card.SBCount = 1;
                SB.push(card);
            }
        }

        $scope.moveToDeck = function (card)
        {
            //decrement sideboard by one
            SB = $scope.sideboard;

            var j = indexOfCard(SB, card);
            SB[j].SBCount--;

            //increment decklist by one
            deckList = $scope.deckList;
            var k = indexOfCard(deckList, card);
            if (k >= 0)
            {
                deckList[k].quantity++;

            }
            else
            {
                card.quantity = 1;
                deckList.push(card)
            }
        }

        $scope.getHelp = function()
        {
            getHelp();
        }

        $scope.decreaseBatchSize = function()
        {
            $scope.cardsPerBatch--;

        }

        $scope.increaseBatchSize = function()
        {
            $scope.cardsPerBatch++;

        }

        
    };


    app.controller("MainController", MainController);

})();