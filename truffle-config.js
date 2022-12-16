const HDWalletProvider = require('@truffle/hdwallet-provider')

const dotenv = require("dotenv")
dotenv.config()

const MNEMONIC = process.env.MNEMONIC;

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1", // Ganache
            port: 7545,
            network_id: "*",
        },
        bnb: {
            provider: () => new HDWalletProvider(
                MNEMONIC,
                `https://bsc-testnet.public.blastapi.io`
            ),
            network_id: 97, // BNB chain testnet id
            confirmations: 2,
            timeoutBlocks: 9999999,
            skipDryRun: true,
            networkCheckTimeout: 999999999
        },
        fantom: {
            provider: () => new HDWalletProvider(
                MNEMONIC,
                `https://rpc.ankr.com/fantom_testnet`
            ),
            network_id: 4002, // Fantom chain testnet id
            confirmations: 2,
            timeoutBlocks: 9999999,
            skipDryRun: true,
            networkCheckTimeout: 999999999
        },
        avalanche: {
            provider: () => new HDWalletProvider(
                MNEMONIC,
                `https://rpc.ankr.com/avalanche_fuji`
            ),
            network_id: 43113, // Avalanche chain testnet id
            confirmations: 2,
            timeoutBlocks: 9999999,
            skipDryRun: true,
            networkCheckTimeout: 999999999
        },
        goerli: {
            provider: () => new HDWalletProvider(
                MNEMONIC,
                `https://rpc.ankr.com/eth_goerli`
            ),
            network_id: 5, // Goerli chain testnet id
            confirmations: 2,
            timeoutBlocks: 9999999,
            skipDryRun: true,
            networkCheckTimeout: 999999999
        }
    },

    mocha: {},

    compilers: {
        solc: {
            version: "0.8.16",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 1500
                }
            }
        }
    },

    plugins: ["truffle-contract-size"],
};
