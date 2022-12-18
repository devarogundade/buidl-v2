<template>
<section>
    <Progress v-if="fetching" />
    <div class="app-width" v-else>
        <div class="collection">
            <div class="image">
                <img :src="collection.cover" alt="" class="cover">
                <img :src="collection.avatar" alt="" class="avatar">
            </div>
            <div class="text">
                <div>
                    <h3 class="name">{{ collection.name }} ({{ collection.symbol }})</h3>
                    <a>
                        <p class="link">
                            {{
                            collection.address.toLowerCase().substring(0, 15) +
                            "..." +
                            collection.address.toLowerCase().substring(collection.address.length - 15, collection.address.length)
                            }}
                            <i class="fi fi-rr-copy"></i></p>
                    </a>
                </div>
                <div class="actions">
                    <router-link v-if="isCreator" :to="`/collections/${$route.params.collection}/settings`">
                        <div class="button button2"><i class="fi fi-rr-settings"></i> Settings</div>
                    </router-link>
                    <router-link v-if="isCreator" :to="`/collections/${$route.params.collection}/new-art`">
                        <div class="button">New NFT</div>
                    </router-link>
                    <div class="button" v-else>Mint</div>

                    <div v-on:click="share()" class="button share"><i class="fi fi-rr-arrow-up-from-square"></i></div>
                </div>
            </div>
            <div class="nfts">
                <div class="nft" v-for="(nft, index) in nfts" :key="index">
                    <router-link :to="`/bridge/${$route.params.collection}/${nft.token_id}?chain=${nft.chainId}`">
                        <img :src="findChain(nft.chainId).image" alt="" class="chain">
                    </router-link>
                    <div class="metadata">
                        <h3 class="name">{{ toJson(nft.metadata).name }}</h3>
                        <p class="id"># {{ nft.token_id }}</p>
                    </div>
                    <img class="thumbnail" :src="toJson(nft.metadata).image" alt="">
                    <a target="_blank" :href="`https://testnets.opensea.io/assets/avalanche-fuji/${$route.params.collection}/${nft.token_id}`">
                        <div class="view">View Item</div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import chains from '~/static/chains.json';
import Authenticate from '~/static/scripts/Authenticate'
import Firestore from '~/static/scripts/Firestore'
import Network from '~/static/scripts/Network';
import NFT from '~/static/scripts/NFT'

export default {
    layout: 'index',
    data() {
        return {
            chains: chains,
            collection: null,
            isCreator: false,
            fetching: true,
            nfts: []
        }
    },
    created() {
        this.getCollection()
        this.getItems()
    },
    methods: {
        findChain: function (id) {
            return this.chains.filter(chain => chain.chainId == id)[0]
        },
        getCollection: async function () {
            const address = (await Authenticate.getUserAddress(Network.current())).address

            this.fetching = true

            this.collection = await Firestore.fetch(
                "collections",
                this.$route.params.collection.toUpperCase()
            )

            this.fetching = false

            this.isCreator = this.collection.creator == address.toUpperCase()
        },
        share: async function () {
            const shareData = {
                title: this.collection.name,
                text: 'Visit my collection',
                url: `https://buidl-v2.netlify.app/collections/${this.$route.params.collection}`
            }

            try {
                await navigator.share(shareData);
            } catch (error) {

            }
        },
        getItems: async function () {
            const nfts = []

            for (let index = 0; index < this.chains.length; index++) {
                const chainId = this.chains[index].chainId

                const x = await NFT.getNftsFromContract(
                    this.$route.params.collection,
                    this.findChain(chainId).slug
                )

                console.log(chainId, x);

                if (x) {
                    x.forEach(nft => {
                        nft.chainId = chainId
                        nfts.push(nft)
                    })
                }
            }

            this.nfts = nfts.sort(nft => nft.chainId)
        },
        toJson: function (value) {
            return JSON.parse(value)
        }
    }
}
</script>

<style scoped>
.app-width {
    padding-top: 80px;
    padding-bottom: 150px;
}

.image {
    width: 100%;
    height: 200px;
    position: relative;
    margin-bottom: 100px;
}

.image .cover {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.image .avatar {
    position: absolute;
    width: 120px;
    height: 120px;
    left: 20px;
    bottom: -60px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px #333025 solid;
}

.name {
    font-size: 26px;
}

.text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    color: #fff;
}

.text .button {
    height: 60px;
    background: linear-gradient(90deg, #F64B4B -43.68%, #F3CB34 72.76%);
    border-radius: 8px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.02em;
    gap: 10px;
    color: #333025;
}

.text .button2 {
    background: #3d392a;
    color: #fff8dd;
}

.text .share {
    width: 60px;
    background: #3d392a;
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    border-radius: 30px;
}

.nfts {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.nft {
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    width: 280px;
}

.nft .thumbnail {
    width: 100%;
    height: 360px;
    object-fit: cover;
}

.nft .metadata {
    position: absolute;
    width: 100%;
    bottom: 50px;
    left: 0;
    padding: 10px;
    padding-top: 100px;
    gap: 20px;
    color: #fff;
    background-image: linear-gradient(to bottom, transparent, #ca9f02);
    font-weight: 600;
}

.nft .name {
    font-size: 20px;
}

.nft .id {
    font-size: 16px;
    opacity: 0.8;
}

.view {
    height: 50px;
    width: 100%;
    background: #695200;
    color: #fff8dd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
}

.chain {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 5px;
    background: #333025;
}

.link {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #ca9f02;
}

.actions {
    display: flex;
    align-items: center;
    gap: 20px;
}
</style>
