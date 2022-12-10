<template>
<section>
    <div class="app-width">
        <div class="apply">
            <div class="form">
                <div class="image">
                    <img src="" alt="" class="cover">
                    <img src="" alt="" class="avatar">
                </div>

                <div class="edit">
                    <p class="label">Collection Name</p>
                    <input :class="getInputClassForName()" type="email" v-model="name" placeholder="John Doe" maxlength="45">
                    <p v-if="errorName" class="error-text">{{ errorName }}</p>
                </div>

                <div class="edit">
                    <p class="label">About Collection</p>
                    <input :class="getInputClassForEmail()" type="email" v-model="email" placeholder="Johndoe@mail.com" maxlength="45">
                    <p v-if="errorEmail" class="error-text">{{ errorEmail }}</p>
                </div>

                <div class="edit">
                    <p class="label">Select supported blockchains</p>
                    <div class="roles">
                        <div :class="role == 'Creator' ? 'selected role' : 'role'" v-on:click="role ='Creator'">Mumbai <img src="/images/checkbox.svg"></div>
                        <div :class="role == 'Developer' ? 'selected role' : 'role'" v-on:click="role ='Developer'">BSC <img src="/images/checkbox.svg"></div>
                        <div :class="role == 'Marketer' ? 'selected role' : 'role'" v-on:click="role ='Marketer'">Arbitium <img src="/images/checkbox.svg"></div>
                        <div :class="role == 'Gnosis' ? 'selected role' : 'role'" v-on:click="role ='Gnosis'">Gnosis <img src="/images/checkbox.svg"></div>
                    </div>
                </div>

                <div class="edit">
                    <p class="label">Website Link</p>
                    <input :class="getInputClassForWork()" v-model="work" type="text" placeholder="https://www.example.com">
                    <p class="error-text" v-if="errorWork">{{ errorWork }}</p>
                </div>

                <div class="edit">
                    <p class="label">Telegram Username</p>
                    <input :class="getInputClassForTelegram()" v-model="telegram" type="text" placeholder="@username">
                    <p class="error-text" v-if="errorTelegram">{{ errorTelegram }}</p>
                </div>

                <div class="sign_up" v-if="!applying" v-on:click="apply()">Create</div>
                <div class="sign_up" v-else>Please wait..</div>
            </div>

        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            //name
            name: '',
            errorName: null,
            // role
            role: '',
            // email
            email: '',
            errorEmail: null,
            // telegram
            telegram: '',
            errorTelegram: null,
            // work
            work: '',
            errorWork: null,
            // signing
            applying: false,
            success: false
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
        apply() {
            if (this.applying && !this.success) return
            this.applying = false

            if (this.errorName != null ||
                this.errorEmail != null ||
                this.errorTelegram != null ||
                this.errorWork != null
            ) {
                return
            }

            if (this.name == '' ||
                this.telegram == '' ||
                this.email == '' ||
                this.work == ''
            ) {
                return
            }

            if (this.role == '' || this.role == null) {
                this.$emit('error', 'Select a role')
                return
            }

            this.applying = true

            const params = `name=${this.name}&email=${this.email}&role=${this.role}&telegram=${this.telegram}&work=${this.work}`

            this.$axios.get(`https://server.luckycats.games/api/apply?${params}`).then(response => {
                const status = response.data.status
                const code = response.data.code
                const message = response.data.message

                if (status) {
                    this.success = true
                } else if (code == 10000) {
                    this.$emit('error', 'You have entered wrong details')
                } else {
                    this.$emit('error', message)
                }

                this.applying = false
            }).catch(err => {
                this.$emit('error', err)
                this.applying = false
            })
        },

        getInputClassForName() {
            if (this.name == '') {
                this.errorName = null
                return ''
            }

            if (this.name.length < 3) {
                this.errorName = 'Name is too short'
                return 'error filled'
            } else {
                this.errorName = null
                return 'filled'
            }
        },

        getInputClassForEmail() {
            if (this.email == '') {
                this.errorEmail = null
                return ''
            }

            if (!this.validateEmail(this.email)) {
                this.errorEmail = 'Invalid email address'
                return 'error filled'
            } else {
                this.errorEmail = null
                return 'filled'
            }
        },

        getInputClassForTelegram() {
            if (this.telegram == '') {
                this.errorTelegram = null
                return ''
            }

            if (!this.telegram.startsWith('@')) {
                this.errorTelegram = 'Username must start with @'
                return 'error filled'
            }
            if (this.telegram.length < 4) {
                this.errorTelegram = 'Invalid username'
                return 'error filled'
            } else {
                this.errorTelegram = null
                return 'filled'
            }
        },

        getInputClassForWork() {
            if (this.work == '') {
                this.errorWork = null
                return ''
            }

            if (!(this.work.startsWith('https://') || this.work.startsWith('http://'))) {
                this.errorWork = 'Invalid link'
                return 'error filled'
            } else {
                this.errorWork = null
                return 'filled'
            }
        },

        validateEmail(email) {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
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
    color: #BCB69F;
    margin-bottom: 10px;
}

.form input {
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
    color: #F9F6ED;
}

.form .filled {
    border: 2px solid #E3BF36;
}

.form .error {
    border: 2px solid #C74F4F;
}

.form .error-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #C74F4F;
    margin-top: 10px;
}

.form .checkbox {
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.02em;
    color: #BCB69F;
    margin-top: 20px;
    display: flex;
    align-items: center;
    column-gap: 20px;
    user-select: none;
    cursor: pointer;
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

.role img {
    width: 16px;
    height: 16px;
    display: none;
}

.selected {
    background: #E3BF36;
    color: #3D392A;
}

.selected img {
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
    border: 3px #fff solid;
}
</style>
