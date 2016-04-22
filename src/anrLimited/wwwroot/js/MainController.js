var MainController = function ($scope) {
    $scope.message = "Hello!";
    $scope.noise = noise;
    $scope.deckList = [noise];
};

class Card {
    constructor(imgSrc, name, quantity) {
        this.imgSrc = imgSrc;
        this.name = name;
        this.quantity = quantity;
    }

}

noise = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01001.png", "Noise", 1);

app.controller("MainController", MainController);