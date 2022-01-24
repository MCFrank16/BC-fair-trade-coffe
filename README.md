# BC-fair-trade-coffe
This blockchain application proves the authenticity of the coffee by using ethereum blockchain, it is a supply chain application where an item goes through 8 steps, the application has also 4 user roles, farmer, distributor, retailer and the consumer.

## Supply chain steps
Harvest by the `Farmer`
Processed by the `Farmer`
Pack by the `Farmer`
ForSale by the `Farmer`
Sold by the `Distributor`
Shipped by the `Distributor`
Received by the `Retailer`
Purchased by the `Consumer`

## to run the application follow these steps, make sure you have a metamask wallet
`npm install`

## to run the application frontend follow these steps
`cd app/src`
`npm install`
`npm run dev`

## Libraries Built with
`Truffle v5.1.13` 
As I was using the ethereum blockchain, this library helped me to develop and test my application using mocha and chai,
it also helped me to deploy the application on the rinkeby network.

`web3 v1.2.4`
For me to interact with my contract deployed on ethereum, I had to use web3 which provides an API to use so we can easily
interact with the blockchain.

## Supply Chain Contract address
[0x57044c149892EF739a4Ee45D428448c0aFB310e9](https://rinkeby.etherscan.io/address/0x57044c149892EF739a4Ee45D428448c0aFB310e9)

## Supply Chain Transaction ID
[0x553101d28ef536d6c3da46ccbd2975bd56f0396ae8745baa02fc6c911d40d610](https://rinkeby.etherscan.io/tx/0x553101d28ef536d6c3da46ccbd2975bd56f0396ae8745baa02fc6c911d40d610)
