<template>
<section>
    <div class="app-width">
        <div class="container">
            <div class="collections">
                <router-link v-for="(collection, index) in collections" :to="`/collections/${collection.name}`" :key="index">
                    <div class="collection">
                        <div class="image">
                            <img class="cover" :src="collection.cover" alt="">
                            <img class="avatar" :src="collection.image" alt="">
                        </div>
                        <div class="text">
                            <h3>{{ collection.name }}</h3>
                            <p>{{ collection.description }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="create">
                <router-link to="/create">
                    <div class="button">
                        <i class="fi fi-rr-plus"></i>
                        <p>Create New Art Collection</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            collections: [{
                    name: 'Simple Storage',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi laborum sit.',
                    image: 'https://opensea.io/static/images/learn-center//how-to-buy-nft.png',
                    cover: 'https://opensea.io/static/images/learn-center//how-to-buy-nft.png'
                },
                {
                    name: 'Simple Storage',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi laborum sit.',
                    image: 'https://opensea.io/static/images/learn-center//how-to-create-nft.png',
                    cover: 'https://opensea.io/static/images/learn-center//how-to-create-nft.png'
                },
                {
                    name: 'Simple Storage',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi laborum sit.',
                    image: 'https://opensea.io/static/images/learn-center//what-are-gas-fees.png',
                    cover: 'https://opensea.io/static/images/learn-center//what-are-gas-fees.png'
                }
            ]
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
    border-radius: 20px;
    border: 1px solid #ccc;
    overflow: hidden;
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
    border: 2px #fff solid;
}

.collection .text {
    margin-top: 20px;
    padding: 20px;
    color: #000;
}

.collection .text h3 {
    font-size: 22px;
}

.collection .text p {
    opacity: 0.8;
    font-size: 14px;
}

.create {
    margin-top: 100px;
    display: flex;
    justify-content: center;
}

.button {
    width: 280px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    color: #000;
}
</style>
