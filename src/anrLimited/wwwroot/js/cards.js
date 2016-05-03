(function ()
{

    var cards = function ()
    {
        console.log("the method cards executing");

        var fdb = new ForerunnerDB();
        var db = fdb.db("myDB");
        var cardCollection = db.collection("card", { primaryKey: "code" });

        //load cards into the database
        var cardDatabase = $.getJSON("../js/cards.json", function (data)
        {
            console.log("db loading");
            cardCollection.insert(data);

            var myCards = cardCollection.find({
                quantity: {
                    "$gt": 0,
                    "$lt": 5
                }
            });
            //alert("found some cards: " + myCards[5].code);

            //set initial batch
            var initialBatch = cardCollection.find({
                type: {
                    "$eq": "Identity"
                }
            });



        });



        var getIDs = function (faction, number)
        {



        };

        var getCardBatch = function (number)
        {
            var cards = [];

            return cards
        };

        var Card = class Card
        {
            constructor(imgSrc, name, quantity)
            {
                this.imgSrc = imgSrc;
                this.name = name;
                this.quantity = quantity;
            };
        }

        var noise = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01001.png", "Noise", 1);
        var kate = new Card("https://netrunnerdb.com/bundles/netrunnerdbcards/images//cards/en//01002.png", "kate", 1);


        var getIDBatch = function ()
        {
            console.log("in get id");
            return [noise, kate];
        };

        return{
            getIDBatch: getIDBatch
            //getIDBatch: getIDBatch
        };

    };

    // Angular plumbing stuff

    var module = angular.module("anrLimited");
    module.factory('$cards', cards);
})();
