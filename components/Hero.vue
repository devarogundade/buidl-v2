<template>
<section>
    <div class="app-width">
        <div class="hero">
            <h3 class="hero_title">
                Buidl is A Multi Chain
                <a href="/collections"><span>NFT Creation</span></a>,
                Tool <a href="/nft-insurance"><span>NFT Insurance</span></a>
            </h3>
            <p class="hero_subtitle">Create NFTs Collection that Works On Across Multiple Chain <br> With Zero Knowledge</p>
            <div class="action">
                <router-link to="/create">
                    <div class="get_started">
                        <i class="fi fi-rr-plus"></i>
                        Create Your NFT Collection
                    </div>
                </router-link>
            </div>
            <div class="powered">
                <p>Built With:</p>
                <div class="images">
                    <img src="/images/multichain.webp" alt="">
                    <img src="/images/moralis.png" alt="">
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
section {
    background-image: url('/images/hero-bg.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.app-width {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 850px;
}

.hero {
    width: 1200px;
    max-width: 100%;
    padding-top: 220px;
    padding-bottom: 60px;
    text-align: center;
}

.hero_title,
.hero_title span {
    font-size: 65px;
    line-height: 75px;
    font-weight: 800;
    font-weight: 600;
    background-image: linear-gradient(to bottom, #ffffff 0%, #fff282 100%);
    background-clip: text;
    color: transparent;
    z-index: 1;
}

.hero_title span {
    background-image: linear-gradient(to bottom, #ffffff 0%, #fff282 100%);
    text-decoration: underline #fff282 3px;
}

.hero_subtitle {
    margin-top: 40px;
    font-size: 28px;
    font-weight: 600;
    color: #fff;
}

.action {
    display: flex;
    justify-content: center;
}

.get_started {
    width: 340px;
    height: 60px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
    font-size: 18px;
    margin-top: 100px;
    color: #F3CB34;
    border: 4px solid #3d392a;
}

.powered {
    margin-top: 160px;
    width: 100%;
    text-align: left;
    font-weight: 600;
    color: #fff282;
}

.images {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    margin-top: 10px;
}

.images img {
    height: 40px;
}

@media screen and (max-width: 700px) {
    .hero {
        padding-top: 150px;
    }

    .powered {
        margin-top: 100px;
    }

    .hero_title,
    .hero_title span {
        font-size: 40px;
        line-height: 50px;
    }

    .hero_subtitle {
        margin-top: 24px;
        font-size: 22px;
        font-weight: 600;
    }
}
</style>
