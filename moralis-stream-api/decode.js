const Web3 = require('web3')

module.exports = {
    // converts EVM data to typeof array
    decode: function(format, value) {
        const web3 = new Web3()
        const data = web3.eth.abi.decodeParameters(format, value)
        return data
    },
    formats: function(collection) {
        // returns EVM event data formats
        switch (collection) {
            case 'collections':
                return ['string', 'string', 'string', 'string', 'address', 'address', 'address[]', 'address[]', 'bool', 'uint256', 'uint', 'uint[]']
            default:
                return null
        }
    },
    toObject: function(collection, data) {
        // each object must have a property of id
        switch (collection) {
            case 'collections':
                return {
                    id: data[5].toUpperCase(), // avoid case sensitive
                    name: data[0],
                    symbol: data[1],
                    cover: data[2],
                    avatar: data[3],
                    creator: data[4],
                    address: data[5],
                    whiteList: data[6],
                    blackList: data[7],
                    isWhiteSystem: data[8],
                    mintPrice: data[9],
                    chainId: data[10],
                    supportedChains: data[11]
                }
            default:
                return null
        }
    }
}
