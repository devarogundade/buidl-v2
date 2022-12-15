<template>
<section>
    <div class="app-width">
        <div class="apply">
            <div class="form">
                <div class="image">
                    <img :src="image" id="image" class="cover">
                    <input type="file" accept="image/*" v-on:change="chooseImage($event)">
                </div>

                <div class="edit">
                    <p class="label">Art Name</p>
                    <input type="text" v-model="name" placeholder="Astronaut on moon" maxlength="45">
                </div>

                <div class="edit">
                    <p class="label">About Art</p>
                    <input type="text" v-model="about" placeholder="A short description" maxlength="1002">
                </div>

                <div class="edit">
                    <p class="label">Attributes</p>
                    <div class="grid" v-for="(attribute, index) in attributes" :key="index">
                        <input type="text" v-model="attribute.trait_type" placeholder="Key" maxlength="30">
                        <input type="text" v-model="attribute.value" placeholder="Value" maxlength="30">
                    </div>
                    <p class="add_attr" v-on:click="addNewAttribute()">Add new attribute</p>
                </div>

                <div class="sign_up" v-if="!creating" v-on:click="create()">Create</div>
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
import IPFS from '~/static/scripts/IPFS';

export default {
    data() {
        return {
            name: '',
            about: '',
            image: '/images/placeholder.webp',
            attributes: [{
                trait_type: '',
                value: ''
            }],
            creating: false,
            imageFile: null
        }
    },
    watch: {
        errorMessage: function (val) {
            if (val != null) {
                setTimeout(() => {
                    this.errorMessage = null
                }, 1000);
            }
        }
    },
    methods: {
        addNewAttribute: function () {
            this.attributes.push({
                trait_type: '',
                value: ''
            })
        },
        chooseImage: function (event) {
            const file = event.target.files[0]
            const url = URL.createObjectURL(file)
            document.getElementById('image').src = url
            this.imageFile = file
        },
        create: async function () {
            if (this.creating) return
            this.creating = false

            // validation
            if (this.name == '' ||
                this.about == ''
            ) {
                return
            }

            this.creating = true

            // upload image
            const image = await IPFS.upload("image", await IPFS.toBase64(this.imageFile))

            // art metadata
            const metadata = {
                name: this.name,
                description: this.about,
                image: image,
                attributes: this.attributes
            }

            // metadata uri
            const uri = await IPFS.upload("uri", metadata)

            // user address
            const address = (await Authenticate.getUserAddress()).address

            // contract call
            const response = await CrossArt.createArt(
                uri,
                address,
                this.$route.params.collection.toLowerCase()
            )

            this.creating = false
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
    height: 440px;
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

.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
}

.add_attr {
    padding: 10px 0;
    text-decoration: underline;
    font-size: 16px;
    color: #F3CB34;
    cursor: pointer;
    user-select: none;
}
</style>
