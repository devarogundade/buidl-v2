<template>
<section>
    <div class="app-width">
        <div class="collection">
            <div class="image">
                <img src="" alt="" class="cover">
                <img src="" alt="" class="avatar">
            </div>
            <div class="text">
                <div>
                    <h3 class="name">Simple Storage</h3>
                    <p class="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, vitae delectus eius..</p>
                </div>
                <div class="div">
                    <div class="button">Mint</div>
                </div>
            </div>
            <div class="nfts">
                <div class="nft" v-for="index in 20" :key="index"></div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    layout: 'index'
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
    border: 3px #fff solid;
}

.name {
    font-size: 26px;
}

.text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
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
    border: 1px #ccc solid;
    border-radius: 16px;
    overflow: hidden;
    height: 320px;
    width: 264px;
}
</style>
