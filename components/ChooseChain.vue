<template>
<div class="container">
    <div class="app-width">
        <div class="head">
            <i class="fi fi-rr-cross" v-on:click="$emit('close', 5)"></i>
            <h3>Choose Your Primary Network</h3>
        </div>

        <p class="note">Note that you are not limited to this network as your will still select other chains you want to support.</p>

        <div class="chains">
            <div v-for="chain in chains" v-on:click="chooseChain(chain.chainId)" :class="selectedChain == chain.chainId ? 'chain selected' : 'chain'" :key="chain.chainId">
                <i v-if="selectedChain == chain.chainId" class="fi fi-rr-check"></i>
                <img :src="chain.image" alt="">
                <div class="text">
                    <h3>{{ chain.name }}</h3>
                    <p>Chain ID: {{ chain.chainId }}</p>
                </div>
            </div>
        </div>

        <div class="action">
            <div class="button" v-on:click="$emit('close', selectedChain)">Proceed</div>
        </div>
    </div>
</div>
</template>

<script>
import chains from "~/static/chains.json"
import Network from "~/static/scripts/Network"
export default {
    data() {
        return {
            chains: chains,
            selectedChain: 5
        }
    },
    created() {
        this.chooseChain(this.selectedChain)
    },
    methods: {
        chooseChain: function (chainId) {
            this.selectedChain = chainId
            Network.updateNetwork(chainId)
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #333025;
    z-index: 30;
    display: flex;
    justify-content: center;
}

.head {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 50px;
    height: 120px;
    color: #fff;
    font-size: 30px;
    font-weight: 600;
}

.note {
    font-size: 20px;
    color: #BCB69F;
    font-weight: 500;
}

.chains {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    margin-top: 60px;
}

.chain {
    width: 327px;
    border-radius: 10px;
    cursor: pointer;
    background: #3d392a;
    user-select: none;
    position: relative;
    padding: 20px;
}

.selected {
    background: #686042;
}

.chain img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
}

.chain .fi-rr-check {
    width: 40px;
    height: 40px;
    position: absolute;
    top: -20px;
    right: -20px;
    border-radius: 50%;
    background: #F3CB34;
    color: #333025;
    font-weight: 600;
}

.chain .text {
    color: #fff;
}

.chain .text h3 {
    font-size: 22px;
    margin-top: 10px;
}

.chain .text p {
    opacity: 0.8;
    font-size: 16px;
}

.action {
    display: flex;
    justify-content: flex-end;
}

.button {
    height: 60px;
    background: linear-gradient(90deg, #F64B4B -43.68%, #F3CB34 72.76%);
    border-radius: 8px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    margin-top: 60px;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.02em;
    gap: 10px;
    color: #333025;
}
</style>
