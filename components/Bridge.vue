<template>
<section>
    <div class="app-width">
        <div class="form">
            <div class="nft">
                <div class="image">
                    <img :src="nft.image" alt="">
                </div>
                <div class="text">
                    <h3 class="name">Sample Storage</h3>
                    <p class="id">#49483</p>
                </div>
                <i class="fi fi-rr-angle-right"></i>
            </div>
            <div class="from">
                <p>Current chain</p>
                <div class="chain">
                    <img :src="findChain(nft.chainId).image" alt="">
                    <p>{{ findChain(nft.chainId).name }}</p>
                    <!-- <i class="fi fi-rr-angle-down"></i> -->
                </div>
            </div>
            <div class="from">
                <p>Destination chain</p>
                <div class="chain" v-on:click="showChains = true">
                   <img :src="findNextChain(nft.chainId).image" alt="">
                    <p>{{ findNextChain(nft.chainId).name }}</p>
                    <i class="fi fi-rr-angle-down"></i>
                </div>
            </div>
        </div>

        <div class="action">
            Bridge
        </div>
    </div>

    <ChainsPicker v-if="showChains" v-on:close="showChains = false" />
</section>
</template>

<script>
import chains from "~/static/chains.json"
export default {
    data() {
        return {
            chains: chains,
            showChains: false,
            nft: {
                chainId: 4002,
                image: "https://opensea.io/static/images/learn-center//how-to-create-nft.png"
            }
        }
    },
    methods: {
        findChain: function (id) {
            return this.chains.filter(chain => chain.chainId == id)[0]
        },
        findNextChain: function (id) {
            return this.chains.filter(chain => chain.chainId != id)[0]
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
    border-radius: 20px;
    border: 1px #ccc solid;
    overflow: hidden;
}

.nft {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    cursor: pointer;
    user-select: none;
}

.nft .image {
    width: 80px;
    height: 80px;
}

.nft .text {
    width: 80%;
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
    font-size: 16px;
}

.nft .id {
    font-size: 14px;
}

.from {
    border-top: 1px #ccc solid;
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
}

.action {
    height: 60px;
    background: linear-gradient(90deg, #F64B4B -43.68%, #F3CB34 72.76%);
    border-radius: 8px;
    width: 300px;
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
