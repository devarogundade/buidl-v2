import axios from "axios"

const NFT = {
    getNftsFromContract: async function(address, chain) {
        try {
            const options = {
                method: 'GET',
                url: `https://deep-index.moralis.io/api/v2/nft/${address}`,
                params: { chain: chain, format: 'decimal' },
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'X-API-Key': `${process.env.MORALIS_KEY}`
                }
            }

            const response = await axios.request(options)
            console.log(response);
            return response.data.result
        } catch (error) {
            console.log(error);
            return null
        }
    },
    getNft: async function(id, address, chain) {
        try {
            const options = {
                method: 'GET',
                url: `https://deep-index.moralis.io/api/v2/nft/${address}/${id}`,
                params: { chain: chain, format: 'decimal', normalizeMetadata: 'false' },
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'X-API-Key': `${process.env.MORALIS_KEY}`
                }
            }

            const response = await axios.request(options)
            console.log(response);
            return response.data
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

export default NFT
