<template>
<section>
    <div class="app-width">
        <div class="container">
            <div class="collections">
                <router-link v-for="(collection, index) in collections" :to="`/collections/${collection.address}`" :key="index">
                    <div class="collection">
                        <div class="chains">
                            <img v-for="id in collection.supportedChains" :key="id" :src="findChain(id).image" alt="">
                        </div>
                        <div class="image">
                            <img class="cover" :src="collection.cover" alt="">
                            <img class="avatar" :src="collection.avatar" alt="">
                        </div>
                        <div class="text">
                            <h3>{{ collection.name }} ({{ collection.symbol }})</h3>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="create">
                <router-link to="/create">
                    <div class="button">
                        <i class="fi fi-rr-plus"></i>
                        <p>Create New NFT Collection</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import chains from '~/static/chains.json'
import Authenticate from '~/static/scripts/Authenticate'
import Firestore from '~/static/scripts/Firestore'

export default {
    data() {
        return {
            collections: [],
            chains: chains
        }
    },
    created() {
        this.getCollections()
    },
    methods: {
        findChain: function (id) {
            return this.chains.filter(chain => chain.chainId == id)[0]
        },
        getCollections: async function () {
            const address = (await Authenticate.getUserAddress()).address
            this.fetching = true

            this.collections = await Firestore.fetchAllWhere(
                "collections",
                "creator",
                "==",
                address.toUpperCase()
            )

            this.fetching = false
        }
    }
}
</script>

<style scoped>
.container {
    padding: 150px 0;
}

.collections {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 40px;
}

.collection {
    width: 360px;
    border-radius: 10px;
    background: #3d392a;
    overflow: hidden;
    position: relative;
}

.collection .chains {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 3px;
    background: #3d392a;
    padding: 6px;
    border-radius: 6px;
}

.chains img {
    width: 24px;
    height: 24px;
    border-radius: 20px;
    object-fit: cover;
}

.collection .image {
    height: 180px;
    position: relative;
}

.collection .cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.collection .avatar {
    position: absolute;
    bottom: -30px;
    left: 20px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px #333 solid;
}

.collection .text {
    margin-top: 20px;
    padding: 20px;
    color: #fff;
}

.collection .text h3 {
    font-size: 22px;
}

.create {
    margin-top: 100px;
    display: flex;
    justify-content: center;
}

.button {
    width: 340px;
    height: 60px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
    font-size: 18px;
    color: #F3CB34;
    border: 4px solid #3d392a;
}
</style>
