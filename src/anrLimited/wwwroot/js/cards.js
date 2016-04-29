(function ()
{

    var cards = (function ()
    {

        var fdb = new ForerunnerDB();
        var db = fdb.db("myDB");
        var cardCollection = db.collection("card", { primaryKey: "code" });

        //load cards into the database
        var cards = $.getJSON("../js/cards.json", function (data)
        {
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


        return {}

    })();


    //var module = angular.module("MainController");

})();