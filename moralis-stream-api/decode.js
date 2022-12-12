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
            case 'items':
                return ['uint', 'address', 'address', 'uint']
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
                    creator: data[4].toUpperCase(),
                    address: data[5].toUpperCase(),
                    whiteList: data[6],
                    blackList: data[7],
                    isWhiteSystem: data[8],
                    mintPrice: data[9],
                    chainId: data[10],
                    supportedChains: data[11]
                }
            case 'items':
                return {
                    id: `${data[2].toUpperCase()}-${data[0]}`,
                    tokenId: data[0],
                    owner: data[1].toUpperCase(),
                    address: data[2].toUpperCase(),
                    chainId: data[3]
                }
            default:
                return null
        }
    }
}
