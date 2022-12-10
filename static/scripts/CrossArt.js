import contract from 'truffle-contract'
import contractJson from "~/build/contracts/CrossArt.json"

const CrossArt = {
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
        supply = 0,
        supportedChains,
        address,
        coverUrl,
        avatarUrl
    ) {
        const instance = await this.getInstance()

        if (instance == null) return {
            message: 'Failed to Initialize',
            error: null,
            status: false
        }

        try {
            const trx = await instance.deploy(name, symbol, supportedChains, {
                from: address
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
    mint: async function(uri, address, contractAddress) {
        const instance = await this.getInstance()

        if (instance == null) return {
            message: 'Failed to Initialize',
            error: null,
            status: false
        }

        try {
            const trx = await instance.mint(uri, contractAddress, {
                from: address
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
    bridge: async function(tokenId, toChain, address, contractAddress) {
        const instance = await this.getInstance()

        if (instance == null) return {
            message: 'Failed to Initialize',
            error: null,
            status: false
        }

        try {
            const trx = await instance.bridge(tokenId, toChain, contractAddress, {
                from: address
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
    }
}

export default CrossArt