(function ()
{

    var cards = function ($config)
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

        //private
        var getCardBatch = function(cards, number)
        {
            var result = [];
            shuffle(cards);

            for (var i = 0; i < number; i++)
            {

                result.push(cards[i]);
            }
            return result;

        }


        var getRunnerIDBatch = function()
        {
            var runnerIDCards = cardCollection.find
                    ({
                        $and: [
                            { type: "Identity" },
                            { side: "Runner" },
                            { setname: { $ne: "Draft" } }
                        ]
                    });

            return getCardBatch(runnerIDCards, 3);

        }


        var getCorpIDBatch = function (number)
        {
            var corpIDCards = cardCollection.find
                    ({
                        $and: [
                            { type: "Identity" },
                            { side: "Corp" },
                            { setname: { $ne: "Draft" } }
                        ]
                    });

            return getCardBatch(corpIDCards, number);
        };

        var getNewCardBatch = function (number)
        {
            var arr = [];

            // In faction batch
            if (Math.random() > $config.OOFWeight)
            {
                arr = cardCollection.find
               ({
                   $and: [
                       { type: { $ne: "Identity" } },
                       { side: $config.side },
                       { setname: { $ne: "Draft" } },
                       { $or: [{ faction: $config.faction }, { faction: 'Neutral' }] }
                   ]
               });

            }

                //out of faction batch
            else
            {
                arr = cardCollection.find
               ({
                   $and: [
                       { type: { $ne: "Identity" } },
                       { type: { $ne: "Agenda" } },
                       { side: $config.side },
                       { setname: { $ne: "Draft" } },
                       { faction: { $ne: $config.faction } },
                       { faction: { $ne: 'Neutral' } },
                   ]
               });
            }

            shuffle(arr);
            var result = [];

            for (var i = 0; i < 3; i++)
            {
                result.push(arr[i]);
            }
            return result;

        };

        var getStartingSideboard = function(faction)
        {
            if (faction === 'Corp')
            {
            var arr = cardCollection.find
               ({
                   title : 'Hedge Fund'
               });
            }

            else
            {
                var arr = cardCollection.find
               ({
                   title : 'Sure Gamble'
               });
            }

            return arr;
        }

        return{
            getCorpIDBatch: getCorpIDBatch,
            getRunnerIDBatch: getRunnerIDBatch,
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
