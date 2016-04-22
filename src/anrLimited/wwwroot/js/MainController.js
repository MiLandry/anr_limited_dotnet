var MainController = function ($scope) {
    $scope.message = "Hello!";
    $scope.noise = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01001.png", "Noise");
    $scope.deckList = [];
};

class Card {
    constructor(imgSrc, name) {
        this.imgSrc = imgSrc;
        this.name = name;
    }

}

app.controller("MainController", MainController);