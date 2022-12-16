<template>
<section>
    <div class="app-width">
        <div class="apply" v-if="collection">
            <div class="form">
                <div class="image">
                    <img :src="collection.cover" id="cover" class="cover">
                    <img :src="collection.avatar" id="avatar" class="avatar">
                </div>

                <div class="edit">
                    <p class="label">Collection Name</p>
                    <input type="email" v-model="collection.name" disabled placeholder="Simple Art" maxlength="30">
                </div>

                <div class="edit">
                    <p class="label">About Collection</p>
                    <input type="text" v-model="collection.symbol" disabled placeholder="Symbol e.g SMP" maxlength="6">
                </div>

                <div class="edit">
                    <p class="label">Mint Price</p>
                    <input v-model="mintPrice" type="number" placeholder="https://www.example.com">
                </div>

                <div class="sign_up" v-if="!updating" v-on:click="update()">Update</div>
                <div class="sign_up" v-else>
                    <TinyProgress />
                </div>
            </div>

        </div>
    </div>
</section>
</template>

<script>
import Authenticate from '~/static/scripts/Authenticate';
import CrossArt from '~/static/scripts/CrossArt';
import Firestore from '~/static/scripts/Firestore';

export default {
    data() {
        return {
            collection: null,
            mintPrice: '0',
            updating: false,
            fetching: true
        }
    },
    created() {
        this.getCollection()
    },
    methods: {
        getCollection: async function () {
            this.fetching = true

            this.collection = await Firestore.fetch(
                "collections",
                this.$route.params.collection.toUpperCase()
            )

            this.fetching = false
        },
        update: async function () {
            const address = (await Authenticate.getUserAddress()).address

            this.updating = true

            const response = await CrossArt.updateCollection(
                this.whiteList,
                this.blackList,
                this.isWhiteSystem,
                this.mintPrice,
                this.$route.params.collection.toLowerCase()
            )

            this.updating = false
        }
    }
}
</script>

<style scoped>
.app-width {
    padding: 150px 0;
}

.apply {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form {
    width: 550px;
    max-width: 100%;
}

.form .edit {
    width: 100%;
    margin-top: 40px;
}

.form .label {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #887e55;
    margin-bottom: 10px;
}

.edit input {
    height: 50px;
    border: 2px solid #BCB69F;
    border-radius: 8px;
    background: transparent;
    width: 100%;
    padding: 0 20px;
    margin-top: 10px;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.02em;
    outline: none;
}

.tick {
    background: #BCB69F;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 20px;
}

.tick_on {
    background: #F3CB34;
}

.sign_up {
    height: 60px;
    background: linear-gradient(90deg, #F64B4B -43.68%, #F3CB34 72.76%);
    border-radius: 8px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    margin-top: 60px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: #333025;
}

.roles {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.role {
    height: 40px;
    border-radius: 6px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    font-weight: 500;
    background: #3D392A;
    color: #FFFFFF;
    transition: .2s;
    cursor: pointer;
    user-select: none;
    justify-content: space-between;
}

.role i {
    width: 16px;
    height: 16px;
    display: none;
}

.selected {
    background: #E3BF36;
    color: #3D392A;
}

.selected i {
    display: block !important;
}

.image {
    width: 100%;
    height: 240px;
    position: relative;
    margin-bottom: 70px;
}

.image .cover {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.image .avatar {
    position: absolute;
    width: 80px;
    height: 80px;
    left: 20px;
    bottom: -40px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px #333025 solid;
}

.image input {
    position: absolute;
    opacity: 0;
}

.image input:nth-child(2) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.image input:nth-child(4) {
    width: 80px;
    height: 80px;
    left: 20px;
    bottom: -40px;
}
</style>
