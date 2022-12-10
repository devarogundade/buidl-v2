import axios from "axios"

const IPFS = {
    upload: async function(path, base64) {
        try {
            const options = {
                method: 'POST',
                url: '/ipfs/uploadFolder',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'X-API-Key': `${process.env.MORALIS_KEY}`
                },
                data: [{ path: path, content: base64 }]
            }

            const response = await axios.request(options)
            return response.data[0].path
        } catch (error) {
            return null
        }
    }
}

export default IPFS