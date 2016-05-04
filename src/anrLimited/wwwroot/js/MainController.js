(function ()
{
    var MainController = function ($scope, $cards, $interval)
    {

        class Card
        {
            constructor(imgSrc, name, quantity)
            {
                this.imgSrc = imgSrc;
                this.name = name;
                this.quantity = quantity;
            }

        }

        $scope.deckList = [];




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
                if (list[i] === card)
                {
                    list[i].quantity++;

                    //set the next batch of cards
                    setNextBatch();
                    return;
                }
            }

            //otherwise we add one copy of the card to the deck list.
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
            $scope.batchVisibility = 'hidden';

            $scope.currentCardBatch = [];
            var theCards = $cards.getNewCardBatch();

            $scope.currentCardBatch = theCards;

            //now wait until the images have loaded


            //then reveal the new batch
            $interval(revealBatchArea,2000);
        }

        $scope.style = function()
        {
            $scope.batchVisibility = 'visible';

            //$scope.batchAreaStyle = "{'background-color':'blue'}";
        };
        
        var revealBatchArea = function()
        {
            $scope.batchVisibility = 'visible';
        }

        $scope.revealCardArea = function (card)
        {
            //alert('revealCardAreacalled');
        }

        
    };


    app.controller("MainController", MainController);

})();