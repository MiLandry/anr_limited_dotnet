(function ()
{

    var cards = function ()
    {

        var fdb = new ForerunnerDB();
        var db = fdb.db("myDB");
        var cardCollection = db.collection("card", { primaryKey: "code" });

        //load cards into the database
        $.getJSON("../js/cards.json", function (data)
        {
            cardCollection.insert(data);
        });

        function shuffle(array)
        {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex)
            {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }



        


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


        var getCorpIDBatch = function (number)
        {
            var result = [];
            var arr = cardCollection.find
                ({
                $and : [
                    {type : "Identity"},
                    { side: "Corp" },   
                    { setname: { $ne: "Draft" } }
                 ]
            });

            shuffle(arr);

            for(var i =0; i < 3; i++)
            {
                
                result.push(arr[i]);
            }
            return result;


        };

        var getNewCardBatch = function (number)
        {
            var result = [];
            var arr = cardCollection.find
               ({
                   $and: [
                       { type: { $ne: "Identity" } },
                       { side: "Corp" },
                       { setname: { $ne: "Draft" } },
                       { faction: "Jinteki" }
                   ]
               });

            shuffle(arr);

            for (var i = 0; i < 3; i++)
            {

                result.push(arr[i]);
            }
            return result;

        };

        var getStartingSideboard = function()
        {

            var arr = cardCollection.find
               ({
                   title : 'Hedge Fund'
               });

            return arr;
        }

        return{
            getCorpIDBatch: getCorpIDBatch,
            getNewCardBatch: getNewCardBatch,
            getStartingSideboard: getStartingSideboard
           // getIDBatch: getIDBatch
            //getIDBatch: getIDBatch
        };

    };

    // Angular plumbing stuff

    var module = angular.module("anrLimited");
    module.factory('$cards', cards);
})();
