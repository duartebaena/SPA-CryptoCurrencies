define(function () {
    var internals = {}; // internal state
    var externals = {}; // external state

    var coins;
    internals.coins = fetch("https://api.coinlore.net/api/tickers/?start=0&limit=10")
        .then(function (result) {
            return result.json();
        }).then(function (data) {
            //console.log(data);
            coins = data.data;
            console.log(coins);
            return coins;
        })
        .catch(function (error) {
            console.log("Error fetching coins data:", error);
        });
    externals.getCoins = function () {
        console.log("Service:" + internals.coins, coins);
        return coins;
    }

    externals.getCoinData = function (id) {
        //internals.coins; I thougth that I would need to invoke internals.coins everytime, I guess not :)
        var coin = coins.filter(obj => obj.id == id); // as an example: id 90 = BTC;
        return coin;
    }

    return externals;
});