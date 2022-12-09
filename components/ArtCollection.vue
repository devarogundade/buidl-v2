<template>
<section>
    <div class="app-width">
        <div class="container">
            <div class="collections">
                <router-link to="" v-for="collection in collections" :key="collection">
                    <div class="collection">{{ collection }}</div>
                </router-link>
            </div>
            <div class="create">

            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            collections: 3
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
  height: 240px;
  border-radius: 20px;
  border: 1px solid #ccc;
}
</style>
