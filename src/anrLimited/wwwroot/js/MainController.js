(function ()
{
    var MainController = function ($scope)
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

        noise = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01001.png", "Noise", 1);
        dataMine = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01076.png", "Data Mine", 1);
        scorchedEarth = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01099.png", "Scorched Earth", 1);
        neuralKatana = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01077.png", "Neural Katana", 1);

        //$cards.initializeDatabase();

        $scope.currentCardBatch = [dataMine, scorchedEarth, neuralKatana];

        $scope.deckList = [noise];

        $scope.selectCard = function (card)
        {
            list = $scope.deckList;

            var i;
            for (i = 0; i < list.length; i++)
            {
                if (list[i] === card)
                {
                    console.log("card was found");
                    list[i].quantity++;
                    return;
                }
            }

            console.log("new card added");
            $scope.deckList.push(card);
        };

        $scope.newIds = function (n)
        {
            console.log("in new ids");
            $scope.currentCardBatch = [];
            for (var i = 0; i < n; i++)
            {
                $scope.currentCardBatch.push(noise);
            }

            //$scope.currentCardBatch = $cards.getIds(n);
        };


    };

    app.controller("MainController", MainController);

})();