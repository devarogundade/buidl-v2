export default {
    ssr: false,

    target: 'static',

    env: {
        MORALIS_KEY: process.env.MORALIS_KEY
    },

    head: {
        title: 'CrossArt | A Cross Chain NFT Solution',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    css: [
        '@/static/common.css'
    ],

    components: [
        '~/components'
    ],

    plugins: [
        // '@/plugins/BalanceApi.js',
        // '@/plugins/LogsApi.js'
    ],

    modules: [
        '@nuxtjs/axios'
    ],


    axios: {
        baseURL: '/api/v1/',
    },

    build: {
        extend(config, {}) {
            config.node = {
                fs: 'empty',
                net: 'empty',
                express: 'empty'
            }
        }
    },
}
