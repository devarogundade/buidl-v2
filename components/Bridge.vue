<template>
<section>
    <div class="app-width">
        <div class="form" v-if="nft">
            <div class="nft">
                <div class="image">
                    <img :src="toJson(nft.metadata).image" alt="">
                </div>
                <div class="text">
                    <h3 class="name">{{ toJson(nft.metadata).name }}</h3>
                    <p class="id"># {{ nft.token_id }}</p>
                </div>
            </div>
            <div class="from">
                <p>Current chain</p>
                <div class="chain">
                    <img :src="findChain($route.query.chain).image" alt="">
                    <p>{{ findChain($route.query.chain).name }}</p>
                </div>
            </div>
            <div class="from">
                <p>Destination chain</p>
                <div v-if="to" class="chain" v-on:click="showChains = true">
                    <img :src="to.image" alt="">
                    <p>{{ to.name }}</p>
                    <i class="fi fi-rr-angle-down"></i>
                </div>
            </div>
        </div>

        <div class="action" v-on:click="bridge()" v-if="!bridging">Bridge NFT</div>
        <div class="action" v-else>
            <TinyProgress />
        </div>

        <button v-on:click="test()">Add Chain</button>
    </div>

    <ChainsPicker v-if="showChains" v-on:close="showChains = false" v-on:chain="selectChain($event)" />
</section>
</template>

<script>
import chains from "~/static/chains.json"
import Authenticate from '~/static/scripts/Authenticate'
import CrossArt from '~/static/scripts/CrossArt'
import NFT from '~/static/scripts/NFT'
export default {
    data() {
        return {
            chains: chains,
            showChains: false,
            nft: null,
            bridging: false,
            to: null
        }
    },
    created() {
        this.to = this.findNextChain(this.$route.query.chain)
        this.getItem()
    },
    methods: {
        getItem: async function () {
            this.nft = await NFT.getNft(
                this.$route.params.item,
                this.$route.params.collection.toLowerCase(),
                this.findChain("43113").slug
            )
        },
        findChain: function (id) {
            return this.chains.filter(chain => chain.chainId == id)[0]
        },
        findNextChain: function (id) {
            return this.chains.filter(chain => chain.chainId != id)[0]
        },
        toJson: function (value) {
            return JSON.parse(value)
        },
        selectChain: function (chain) {
            this.to = chain
        },
        bridge: async function () {
            const address = (await Authenticate.getUserAddress()).address

            this.bridging = true

            const response = await CrossArt.bridge(
                this.$route.params.item,
                this.to.chainId,
                address,
                this.$route.params.collection.toLowerCase()
            )

            this.bridging = false
        },
        test: async function () {
            const address = (await Authenticate.getUserAddress()).address
            await CrossArt.addChain(4002, '0x0b17D258E1245a1191EB2bA4C505297dE89e7B09', address)
        }
    }
}
</script>

<style scoped>
.app-width {
    display: flex;
    justify-content: center;
    padding: 150px 0;
    flex-direction: column;
    align-items: center;
}

.form {
    width: 400px;
    border-radius: 10px;
    background: #3d392a;
    overflow: hidden;
}

.nft {
    cursor: pointer;
    user-select: none;
    position: relative;
}

.nft .image {
    width: 100%;
    height: 340px;
}

.nft .text {
    width: 100%;
    padding: 10px;
    padding-top: 180px;
    position: absolute;
    background-image: linear-gradient(to bottom, transparent, #3d392a);
    bottom: 0;
    left: 0;
    color: #f9f6ed;
}

.nft img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.nft i {
    padding: 20px;
}

.nft .name {
    font-size: 30px;
}

.nft .id {
    font-size: 16px;
    opacity: 0.8;
}

.from {
    border-top: 6px #333025 solid;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.chain {
    display: flex;
    align-items: center;
    padding: 6px;
    padding-right: 12px;
    background: #ccc;
    border-radius: 30px;
    height: 40px;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
}

.chain img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
}

.from>p {
    font-weight: 600;
    color: #f9f6ed;
}

.action {
    height: 60px;
    background: linear-gradient(90deg, #F64B4B -43.68%, #F3CB34 72.76%);
    border-radius: 8px;
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    margin-top: 40px;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: #333025;
}
</style>
