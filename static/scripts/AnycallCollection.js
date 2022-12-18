import contract from 'truffle-contract'
import contractJson from "~/build/contracts/AnycallCollection.json"
import Utils from './Utils'

const AnycallCollection = {
    instance: null,

    getInstance: async function() {
        if (this.instance != null) {
            return this.instance
        }

        if (typeof ethereum === 'undefined') return null

        const crossArtContract = contract(contractJson)
        crossArtContract.setProvider(ethereum)

        try {
            this.instance = await crossArtContract.deployed()
            return this.instance
        } catch (error) {
            console.log(error);
            return null
        }
    },

    createCollection: async function(
        name,
        symbol,
        supportedChains,
        coverUrl,
        avatarUrl,
        address
    ) {
        const instance = await this.getInstance()

        if (instance == null) return {
            message: 'Failed to Initialize',
            error: null,
            status: false
        }

        try {
            const trx = await instance.createCollection(
                name,
                symbol,
                supportedChains,
                coverUrl,
                avatarUrl, {
                    from: address
                })
            return {
                message: 'Transaction Hash',
                trx: trx,
                status: true
            }
        } catch (error) {
            console.log(error);
            return {
                message: 'Transaction failed',
                error: error,
                status: false
            }
        }
    },

    createArt: async function(uri, address, contractAddress) {
        const instance = await this.getInstance()

        if (instance == null) return {
            message: 'Failed to Initialize',
            error: null,
            status: false
        }

        try {
            const trx = await instance.mint(
                uri,
                contractAddress, {
                    from: address
                })
            return {
                message: 'Transaction Hash',
                trx: trx,
                status: true
            }
        } catch (error) {
            console.log(error);
            return {
                message: 'Transaction failed',
                error: error,
                status: false
            }
        }
    },

    bridge: async function(tokenId, toChain, address, contractAddress) {
        const instance = await this.getInstance()

        if (instance == null) return {
            message: 'Failed to Initialize',
            error: null,
            status: false
        }

        try {
            const trx = await instance.bridge(
                tokenId,
                contractAddress,
                toChain, {
                    from: address,
                    value: Utils.toWei('0.02'),
                })
            return {
                message: 'Transaction Hash',
                trx: trx,
                status: true
            }
        } catch (error) {
            return {
                message: 'Transaction failed',
                error: error,
                status: false
            }
        }
    },

    updateCollection: async function(
        whiteList,
        blackList,
        isWhiteSystem,
        mintPrice,
        contractAddress,
        address
    ) {
        const instance = await this.getInstance()

        if (instance == null) return {
            message: 'Failed to Initialize',
            error: null,
            status: false
        }

        try {
            const trx = await instance.updateCollection(
                whiteList,
                blackList,
                isWhiteSystem,
                mintPrice,
                contractAddress, {
                    from: address
                })
            return {
                message: 'Transaction Hash',
                trx: trx,
                status: true
            }
        } catch (error) {
            console.log(error);
            return {
                message: 'Transaction failed',
                error: error,
                status: false
            }
        }
    },

    addChain: async function(id, contractAddress, address) {
        try {
            const instance = await this.getInstance()

            await instance.addChain(id, contractAddress, {
                from: address
            })
        } catch (error) {

        }
    }
}

export default AnycallCollection
