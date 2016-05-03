(function ()
{

    var cards = function ()
    {
        console.log("the method cards executing");

        var fdb = new ForerunnerDB();
        var db = fdb.db("myDB");
        var cardCollection = db.collection("card", { primaryKey: "code" });

        //load cards into the database
        $.getJSON("../js/cards.json", function (data)
        {
            console.log("db loading");
            cardCollection.insert(data);
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
            //return [noise, kate];
            var result = [];
            var arr = cardCollection.find
                ({
                $and : [
                    {type : "Identity"},
                    { side: "Corp" },   
                    { setname: { $ne: "Draft" } }
                 ]
            });

            for(var i =0; i < 3; i++)
            {
                var card = new Card('https://netrunnerdb.com' + arr[i].imagesrc, arr[i].title, 1);
                result.push(card);
            }
            return result;


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
