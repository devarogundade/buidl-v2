const CrossArt = artifacts.require("CrossArt");


contract("CrossArt", async accounts => {
    it("Init", async() => {
        const crossArt = await CrossArt.deployed()
            // const addChain = await crossArt.addChain(97, "0x335e7Bb9F0A5E37e66FBc3c10501e129dB9c6442")
            // const deploy = await crossArt.deploy("Sample NFT", "SNFT", [97])
        const bridge = await crossArt.bridge(1, "0x53416133ae8F9EDee9F4aC1d7af8d5f251632837", 97, {
            value: 3 * 18 ** 10
        })
    })
})
