const express = require('express')
const app = express()
const fireStore = require('./firestore.js')
const decoder = require('./decode.js')

app.use(express.json())

app.post('/webhook', (req, res) => {
    const webhook = req.body
    let collection = webhook.tag

    console.log(webhook)

    for (const log of webhook.logs) {
        // console.log(log)
        const format = decoder.formats(collection)
            // console.log(format)

        // abi format does not exists for event data
        if (format == null || typeof format === 'undefined') {
            return res.status(400).json();
        }

        const data = decoder.decode(format, log.data)
            // console.log(data)

        const object = decoder.toObject(collection, data)
            // console.log(object)

        // event data to object mapping failed
        if (object == null || typeof object === 'undefined') {
            return res.status(400).json();
        }

        let shouldWrite = true

        // override default flow
        // switch (collection) {

        //     default:
        //         break
        // }

        if (shouldWrite) { // write data to firebase
            fireStore.write(collection, object.id, object, true)
        }
    }

    return res.status(200).json()
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {})
