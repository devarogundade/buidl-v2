<template>
<div class="picker">
    <div class="head">
        <i class="fi fi-rr-cross" v-on:click="$emit('close')"></i>
        <h3>Select a NFT</h3>
    </div>
    <div class="body">
        <div class="tokens">
            <div class="token" v-for="chain in chains" :key="chain.chainId" v-on:click="$emit('chain', chain)">
                <div class="left">
                    <img :src="chain.image" alt="">
                    <p>{{ chain.name }}</p>
                </div>
                <div class="right">
                    <p v-if="chain.address != ''">{{
                  chain.address.substring(0, 4) +
                  "..." +
                  chain.address.substring(chain.address.length - 4, chain.address.length)
                }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import chains from "~/static/chains.json"

export default {
    data() {
        return {
            chains: chains
        }
    }
}
</script>

<style scoped>
.picker {
    position: fixed;
    right: 0;
    width: 400px;
    max-width: 100%;
    height: 100vh;
    top: 0;
    box-shadow: 0 0 10px #CCC;
    z-index: 10;
    background: #fff;
}

.head {
    height: 60px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding: 20px;
    gap: 20px;
}

.head i {
    font-size: 16px;
    cursor: pointer;
}

.token .left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.token img {
    height: 24px;
    border-radius: 20px;
}

.token .left p {
    font-size: 16px;
    margin-top: -4px;
}

.token {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    cursor: pointer;
    user-select: none;
}

.token:hover {
    background: #FAFAFA;
}

.token .right p {
    font-size: 14px;
    text-decoration: underline;
}
</style>
