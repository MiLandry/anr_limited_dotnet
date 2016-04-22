var MainController = function ($scope) {

    $scope.cardOptions = [dataMine, noise];

    $scope.deckList = [noise];

    $scope.selectCard = function (card) {
        list = $scope.deckList;

        var i;
        for (i = 0; i < list.length; i++) 
        {
            if (list[i] === card) {
            console.log("card was found");
            list[i].quantity++;
            return;
            }
        }
        
            console.log("new card added");
            $scope.deckList.push(card);
    };

    $scope.newCards = function (n)
    {
        var list = $scope.cardOptions;
        list = [];
        var rand = 01001;
        for (var i = 0; i < n; i++)
        {
            var card = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01001.png", "random card", 1);
            list.push(card);

        }

    }
};

class Card {
    constructor(imgSrc, name, quantity) {
        this.imgSrc = imgSrc;
        this.name = name;
        this.quantity = quantity;
    }

}

noise = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01001.png", "Noise", 1);
dataMine = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01076.png", "Data Mine", 1);

app.controller("MainController", MainController);


