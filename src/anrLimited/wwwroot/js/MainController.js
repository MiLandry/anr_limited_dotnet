(function ()
{
    var MainController = function ($scope, $cards, $timeout)
    {

        $scope.deckList = [];
        $scope.sideboard = [];


        /**
        *  This is the callback function for when a user clicks the select button to add that card to his deck
        */
        $scope.selectCard = function (card)
        {
            list = $scope.deckList;

            var i;


            //if the card is already in the deck list, then we increment that card by one and return
            for (i = 0; i < list.length; i++)
            {
                if (list[i].title === card.title)
                {
                    list[i].quantity++;

                    //set the next batch of cards
                    setNextBatch();
                    return;
                }
            }

            //otherwise we add one copy of the card to the deck list.  We need to set the quantity to 1,
            //because the raw "quantity" property stores the amount of copies of that card that ships with its containing product.
            card.quantity = 1;
            $scope.deckList.push(card);

            //set the next batch of cards
            setNextBatch();
            return;
        };

        $scope.newCards = function (n)
        {
            $scope.currentCardBatch = [];
            var theCards = $cards.getNewCardBatch();
            $scope.currentCardBatch = theCards;

        }

        $scope.newCorpIDs = function ()
        {
            $scope.currentCardBatch
            $scope.currentCardBatch = [];
            var ids = $cards.getCorpIDBatch();
            $scope.currentCardBatch = ids;

        }

        $scope.newRunnerIDs = function ()
        {
            $scope.currentCardBatch = [];
            var ids = $cards.getIDBatch();
            $scope.currentCardBatch = ids;

        }

        var setNextBatch = function()
        {
            // Hide the entire batch area so that the user cannot accidently add multiple cards from the same batch
            $scope.cardAreasVisibility = 'hidden';

            $scope.currentCardBatch = [];
            var theCards = $cards.getNewCardBatch(3);

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


        
    };


    app.controller("MainController", MainController);

})();