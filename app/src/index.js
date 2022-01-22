import Web3 from "web3";
import supplyChainContract from '../../build/contracts/SupplyChain.json'
import $ from 'jquery'

const App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID,
            App.originFarmerID,
            App.originFarmName,
            App.originFarmInformation,
            App.originFarmLatitude,
            App.originFarmLongitude,
            App.productNotes,
            App.productPrice,
            App.distributorID,
            App.retailerID,
            App.consumerID
        );
    },
    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: async () => {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        try {
            const accounts = await web3.eth.getAccounts();
            App.metamaskAccountID = accounts[0];
        } catch (error) {
            console.log(error)
        }
    },

    initSupplyChain: async () => {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = supplyChainContract.networks[networkId];

        App.contracts.SupplyChain = new web3.eth.Contract(supplyChainContract.abi, deployedNetwork.address);
        App.contracts.SupplyChain.setProvider(App.web3Provider);

        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
        App.fetchEvents()

        return App.bindEvents();
    },
    bindEvents: function () {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function (event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId', processId);
        App.readForm();

        switch (processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
        }
    },



    harvestItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        console.log(App.upc)
        console.log(App.metamaskAccountID)
        console.log(App.originFarmName)
        console.log(App.productNotes)

        const { harvestItem } = App.contracts.SupplyChain.methods;

        try {
            const result = await harvestItem(
                App.upc,
                App.metamaskAccountID,
                App.originFarmName,
                App.originFarmInformation,
                App.originFarmLatitude,
                App.originFarmLongitude,
                App.productNotes
            ).call();
            $("#ftc-item").text(result);
            console.log('harvestItem', result);
        } catch (error) {
            console.log(error.message)
        }
    },

    processItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        const { processItem } = App.contracts.SupplyChain.methods;

        try {
            const result = await processItem(App.upc).call({ from: App.metamaskAccountID });
            $("#ftc-item").text(result);
            console.log('processItem', result);
        } catch (error) {
            console.log(error.message)
        }

    },

    packItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        const { packItem } = App.contracts.SupplyChain.methods;

        try {
            const result = await packItem(App.upc).call({ from: App.metamaskAccountID });
            $("#ftc-item").text(result);
            console.log('packItem', result);
        } catch (error) {
            console.log(error.message)
        }
    },

    sellItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        const { sellItem } = App.contracts.SupplyChain.methods;

        try {
            const result = await sellItem(App.upc, App.productPrice).call({ from: App.metamaskAccountID });
            $("#ftc-item").text(result);
            console.log('sellItem', result);
        } catch (error) {
            console.log(error.message)
        }

    },

    buyItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        const { buyItem } = App.contracts.SupplyChain.methods;

        try {
            const walletValue = web3.utils.toWei('3', 'ether');
            const result = await buyItem(App.upc).call({ from: App.metamaskAccountID, value: walletValue })
            $("#ftc-item").text(result);
            console.log('buyItem', result);
        } catch (error) {
            console.log(error.message)
        }
    },

    shipItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        const { shipItem } = App.contracts.SupplyChain.methods;

        try {
            const result = await shipItem(App.upc).call({ from: App.metamaskAccountID })
            $("#ftc-item").text(result);
            console.log('shipItem', result);
        } catch (error) {
            console.log(error.message)
        }
    },

    receiveItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        const { receiveItem } = App.contracts.SupplyChain.methods;

        try {
            const result = await receiveItem(App.upc).call({ from: App.metamaskAccountID })
            $("#ftc-item").text(result);
            console.log('receiveItem', result);
        } catch (error) {
            console.log(error.message)
        }

    },

    purchaseItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        const { purchaseItem } = App.contracts.SupplyChain.methods;

        try {
            const result = await purchaseItem(App.upc).call({ from: App.metamaskAccountID });
            $("#ftc-item").text(result);
            console.log('purchaseItem', result);
        } catch (error) {
            console.log(error.message)
        }
    },

    fetchItemBufferOne: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc', App.upc);

        const { fetchItemBufferOne } = App.contracts.SupplyChain.methods;

        try {
            const result = fetchItemBufferOne(App.upc);
            $("#ftc-item").text(result);
        } catch (error) {
            console.log(error.message)
        }
    },

    fetchItemBufferTwo: function () {
        ///    event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        const { fetchItemBufferTwo } = App.contracts.SupplyChain.methods;

        try {
            const result = fetchItemBufferTwo(App.upc);
            $("#ftc-item").text(result);
        } catch (error) {
            console.log(error.message)
        }
    },

    fetchEvents: async () => {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                    App.contracts.SupplyChain.currentProvider,
                    arguments
                );
            };
        }

        try {
            App.contracts.SupplyChain.events.allEvents({ fromBlock: 0, toBlock: 'latest' }, (err, log) => {
                if (!err)
                    $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');

            });
        } catch (error) {
            console.log(error.message)
        }

    }

};


window.addEventListener("load", function () {
    App.init();
});