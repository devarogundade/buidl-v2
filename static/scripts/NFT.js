import axios from "axios"

const NFT = {
    getNftsFromContract: async function(address) {
        try {
            const options = {
                method: 'POST',
                url: `https://deep-index.moralis.io/api/v2/nft/${address}`,
                params: { chain: 'eth', format: 'decimal' },
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
