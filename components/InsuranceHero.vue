<template>
<section id="swap">
    <div class="app-width">
        <div class="tag">NFT Offering</div>
        <div class="sweeper">
            <div class="text">
                <div>
                    <h3>Launch Your Initial NFT Offering (INO)</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi rerum, suscipit reprehenderit temporibus expedita doloribus.</p>
                </div>
                <router-link to="/">
                    <div class="action">Learn more</div>
                </router-link>
            </div>
            <div class="image">
                <img src="/images/swap.png" alt="">
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
section {
    padding: 80px;
}

.tag {
    background: #3d392a;
    color: #f9f6ed;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    width: fit-content;
}

.sweeper {
    margin-top: 40px;
}

.text {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    justify-content: space-between;
    align-items: center;
    color: #fff;
}

.text>div {
    width: 600px;
    max-width: 100%;
}

.text h3 {
    font-size: 40px;
    line-height: 50px;
    font-weight: 800;
}

.text p {
    margin-top: 20px;
    font-size: 18px;
    opacity: 0.8;
}

.action {
    width: 220px;
    height: 60px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    background: #e6e6e6;
    color: #010101;
}

.image {
    width: 100%;
    background: rgba(255, 255, 255, 0.055);
    border-radius: 10px;
    margin-top: 60px;
    padding: 60px;
    display: flex;
    justify-content: center;
}

.image img {
    height: 550px;
}

@media screen and (max-width: 700px) {
    section {
        padding: 40px 0;
    }

    .sweeper {
        margin-top: 20px;
    }

    .text {
        gap: 40px;
    }

    .text h3 {
        font-size: 26px;
        line-height: 36px;
    }

    .text p {
        font-size: 16px;
    }

    .image {
        padding: 30px;
    }

    .image img {
        height: unset;
        width: 100%;
    }

    .action {
        width: 200px;
        height: 50px;
        font-size: 16px;
    }
}
</style>
