import axios from "axios"

const IPFS = {
    upload: async function(path, base64) {
        try {
            const options = {
                method: 'POST',
                url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'X-API-Key': `${process.env.MORALIS_KEY}`
                },
                data: [{ path: path, content: base64 }]
            }

            const response = await axios.request(options)
            console.log(response);
            return response.data[0].path
        } catch (error) {
            console.log(error);
            return null
        }
    },
    toBase64: function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }
}

export default IPFS