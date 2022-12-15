<template>
<section>
    <div class="app-width">
        <div class="collection" v-if="collection">
            <div class="image">
                <img :src="collection.cover" alt="" class="cover">
                <img :src="collection.avatar" alt="" class="avatar">
            </div>
            <div class="text">
                <div>
                    <h3 class="name">{{ collection.name }} ({{ collection.symbol }})</h3>
                    <p class="desc">{{ collection.symbol }}</p>
                </div>
                <div class="div">
                    <router-link v-if="isCreator" :to="`/collections/${$route.params.collection}/new-art`">
                        <div class="button">New Art</div>
                    </router-link>
                    <div class="button" v-else>Mint</div>
                </div>
            </div>
            <div class="nfts">
                <div class="nft" v-for="index in 20" :key="index">
                    <div class="bg"></div>
                    <div class="id">#4543</div>
                    <img src="/images/placeholder.webp" alt="">
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import Authenticate from '~/static/scripts/Authenticate'
import Firestore from '~/static/scripts/Firestore'

export default {
    layout: 'index',
    data() {
        return {
            collection: null,
            isCreator: false,
            nfts: []
        }
    },
    created() {
        this.getCollection()
    },
    methods: {
        getCollection: async function () {
            const address = (await Authenticate.getUserAddress()).address

            this.collection = await Firestore.fetch(
                "collections",
                this.$route.params.collection
            )

            this.isCreator = this.collection.creator == address.toUpperCase()
        },
        getItems: async function () {

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
    color: white;
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
    color: #333025;
}

.nfts {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.nft {
    border-radius: 16px;
    overflow: hidden;
    height: 320px;
    position: relative;
    width: 264px;
}

.nft img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.nft .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));
}

.nft .id {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 20px;
    font-weight: 600;
}
</style>
