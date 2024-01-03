define(function () {
    var internals = {
        handlers: {},
        elements: {}
    };

    var externals = {};

    internals.createButton = function () {

        return (
            '<button class="show-coins">SHOW STATS FROM ALL LISTED COINS</button><p>' +
            '<div class="coin-image">' +
            
            '<img class="btc-image" src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029" alt="Bitcoin" width="90px" height= "90px">' +
            '<img class="eth-image" src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029" width="90px" height= "90px">' +
            '<img class="tether-image" src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=029" width="90px" height= "90px">' +
            '<img class="binance-image" src="https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=029" width"90px" height= "90px">' +
            '<img class="sol-image" src="https://cryptologos.cc/logos/solana-sol-logo.png?v=029" width="90px" height= "90px">' +
            '<img class="xrp-image" src="https://cryptologos.cc/logos/xrp-xrp-logo.png?v=029" width="90px" height= "90px">' +
            '<img class="usdCoin-image" src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029" width="90px" height= "90px">' +
            '<img class="cardano-image" src="https://cryptologos.cc/logos/cardano-ada-logo.png?v=029" width="90px" height= "90px">' +
            '<img class="stakedEther-image" src="https://cryptologos.cc/logos/steth-steth-logo.png?v=029" width="90px" height= "90px">' +
            '<img class="avalanche-image" src="https://cryptologos.cc/logos/avalanche-avax-logo.png?v=029" width="90px" height= "90px">' +
            '</div>'
        );
    };
    internals.createCoinsCard = function (coins) {

        console.log(internals.elements)
        const table = $("<table class='coin-table'>");
        const headerRow = $("<tr>");

        headerRow.html(`
                <th>Name</th>
                <th>Symbol</th>
                <th>Price USD</th>
                <th>Price BTC</th>
                <th>Market Cap USD</th>
                <th>24h Change (%)</th>
                <th>7d Change (%)</th>
                <th>1h Change (%)</th>
                <th>Volume of Transactions (24h)</th>
                <th>Total Supply</th>
                <th>Maximum Supply</th>
            `);
        table.append(headerRow);

        console.log("TRYING TO RENDER THE VIEW:", coins, typeof coins);
        console.log(typeof coins);

        coins.forEach(element => {

            var priceUsdFormatNumber = Number(element.price_usd).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            var marketCapFormatNumber = Number(element.market_cap_usd).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });

            var volume24FromatNumber = Number(element.volume24).toLocaleString('en-US');
            var tsupplyFormatNumber = Number(element.tsupply).toLocaleString('en-US');
            var msupplyFormatNumber = Number(element.msupply).toLocaleString('en-US');

            const row = $("<tr>");
            row.html(`
                
                <td>${element.name}</td>
                <td>${element.symbol}</td>
                <td>${priceUsdFormatNumber}</td>
                <td>${element.price_btc}</td>
                <td>${marketCapFormatNumber}</td>
                <td>${element.percent_change_24h + '%'}</td>
                <td>${element.percent_change_7d + '%'}</td>
                <td>${element.percent_change_1h + '%'}</td>
                <td>${volume24FromatNumber}</td>
                <td>${tsupplyFormatNumber}</td>
                <td>${msupplyFormatNumber}</td>
            `);
            table.append(row);
        });




        return table;
    };

    internals.renderCoins = function (coins) {
        if (internals.elements.coinsCard) {
            internals.elements.coinsCard.empty();
        }


        internals.elements.coinsCard = $(internals.createCoinsCard(coins));
        internals.elements.app.append(internals.elements.coinsCard);


    };


    internals.renderButton = function () {
        if (internals.elements.button) {
            return;
        }
        var btcId = 90;
        var ethId = 80;
        var tetherId = 518;
        var binanceId = 2710;
        var solId = 48543;
        var xrpId = 58;
        var usdCoinId = 33285;
        var cardanoId = 257;
        var stakedEtherId = 46971;
        var avalancheId = 44883;
        internals.elements.button = $(internals.createButton());
        //internals.elements.button.click(internals.handlers['button']);
        internals.elements.button.click(function (event) {
            const classToHandler = {
                'show-coins': internals.handlers['show-coins'],
                'btc-image': () => internals.handlers['show-coin'](btcId),
                'eth-image': () => internals.handlers['show-coin'](ethId),
                'tether-image': () => internals.handlers['show-coin'](tetherId),
                'binance-image': () => internals.handlers['show-coin'](binanceId),
                'sol-image': () => internals.handlers['show-coin'](solId),
                'xrp-image': () => internals.handlers['show-coin'](xrpId),
                'usdCoin-image': () => internals.handlers['show-coin'](usdCoinId),
                'cardano-image': () => internals.handlers['show-coin'](cardanoId),
                'stakedEther-image': () => internals.handlers['show-coin'](stakedEtherId),
                'avalanche-image': () => internals.handlers['show-coin'](avalancheId),
            };

            const clickedClass = Array.from(event.target.classList).find(className => classToHandler.hasOwnProperty(className));

            if (clickedClass) {
                classToHandler[clickedClass]();
            } else {
                // Handle the case where the class is not mapped
            }
        });
        internals.elements.app.append(internals.elements.button);

    };

    externals.bind = function (event, handler) {

        internals.handlers[event] = handler;
    };

    externals.render = function (coins) {
        $(document).ready(function () {
            internals.elements.app = $('#app');
            internals.renderButton();

            if (coins) {
                internals.renderCoins(coins);
            }
        });
    }
    return externals;
});