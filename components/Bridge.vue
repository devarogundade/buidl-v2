<template>
<section>
    <Progress v-if="fetching" />
    <div class="app-width" v-else>
        <div class="left">
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

            <a v-if="isOwner">
                <div class="action" v-on:click="bridge()" v-if="!bridging">Bridge NFT</div>
                <div class="action" v-else>
                    <TinyProgress />
                </div>
            </a>
            <a v-else>
                <div class="action">You don't own this NFT!</div>
            </a>
        </div>

        <div class="right">
            <h3>Activities</h3>
            <div class="touches">
                <div class="touch">
                    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png" alt="">
                    <p>Avalanche Fuji Testnet</p>
                </div>
                <!-- <div class="touch">
                    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png" alt="">
                    <p>Mumbai</p>
                </div>
                <div class="touch">
                    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" alt="">
                    <p>BNB Testnet</p>
                </div> -->
            </div>
        </div>

        <!-- <button v-on:click="test()">Add Chain</button> -->
    </div>

    <ChainsPicker v-if="showChains" v-on:close="showChains = false" v-on:chain="selectChain($event)" />
</section>
</template>

<script>
import chains from "~/static/chains.json"
import Authenticate from '~/static/scripts/Authenticate'
import AnycallCollection from '~/static/scripts/AnycallCollection'
import Network from '~/static/scripts/Network'
import NFT from '~/static/scripts/NFT'
export default {
    data() {
        return {
            chains: chains,
            showChains: false,
            nft: null,
            bridging: false,
            fetching: true,
            isOwner: false,
            to: null
        }
    },
    created() {
        this.to = this.findNextChain(this.$route.query.chain)
        this.getItem()
    },
    methods: {
        getItem: async function () {
            this.fetching = true

            this.nft = await NFT.getNft(
                this.$route.params.item,
                this.$route.params.collection.toLowerCase(),
                this.findChain(this.$route.query.chain).slug
            )

            this.fetching = false

            const address = (await Authenticate.getUserAddress(Network.current())).address
            this.isOwner = this.nft.owner_of.toLowerCase() == address.toLowerCase()
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
            const address = (await Authenticate.getUserAddress(Network.current())).address

            this.bridging = true

            const response = await AnycallCollection.bridge(
                this.$route.params.item,
                this.to.chainId,
                address,
                this.$route.params.collection.toLowerCase()
            )

            this.bridging = false
        },
        test: async function () {
            const address = (await Authenticate.getUserAddress(Network.current())).address
            await AnycallCollection.addChain(4002, '0x0C1E9ED4ea9c89F3520e1fB83AFB4d5fCE5321D8', address)
        }
    }
}
</script>

<style scoped>
.app-width {
    display: flex;
    justify-content: center;
    gap: 100px;
    padding: 150px 0;
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

.right {
    width: 350px;
}

.right h3 {
    color: #f9f6ed;
    font-size: 20px;
    text-decoration: underline 2px #F3CB34;
}

.touches {
    margin-top: 20px;
    margin-left: 10px;
}

.touch {
    border-left: 1px #cebd8b solid;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 20px;
}

.touch img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: -35px;
}

.touch p {
    padding: 4px 10px;
    border-radius: 6px;
    background: #3d392a;
    color: #ddd3b3;
    font-size: 16px;
}
</style>
