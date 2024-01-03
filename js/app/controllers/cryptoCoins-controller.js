define(['views/cryptoCoins-view','services/cryptoCoins-service'], function(
    cryptoCoinsView,
    cryptoCoinsService
) {
    var internals = {};
    var externals = {};

    externals.start = function(){
        internals.bindEventHandlers();
        cryptoCoinsView.render();
        
    };

    internals.bindEventHandlers = function(){
        cryptoCoinsView.bind('show-coins', internals.getCoinsbuttonHandler);
        cryptoCoinsView.bind('show-coin', internals.getCoinbuttonHandler);
    };

    internals.getCoinsbuttonHandler = function(){
       var coins = cryptoCoinsService.getCoins();
        console.log("CONTROLLER: ", coins, "TYPE OF:", typeof coins)
            cryptoCoinsView.render(coins);
        
    };
    internals.getCoinbuttonHandler = function(id){
        var coin = cryptoCoinsService.getCoinData(id);
        cryptoCoinsView.render(coin);
    }

    return externals;
});
