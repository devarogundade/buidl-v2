const Authenticate = {
    getUserAddress: async function(chain = '5') {
        if (typeof ethereum === 'undefined') return null

        try {
            await ethereum.request({
                method: 'eth_requestAccounts'
            });

            switch (chain) {
                case '5':
                    console.log('here');
                    await this.switchToEthereumTestnet()
                    break;
                case '97':
                    await this.switchToBinanceTestnet()
                    break;
                case '4002':
                    await this.switchToFantomTestnet()
                    break;
                case '43113':
                    await this.switchToAvalancheTestnet()
                    break;
                case '8001':
                    await this.switchToPolygonTestnet()
                    break;
                default:
                    break;
            }

            const accounts = await ethereum.enable();
            return {
                message: 'Authenticated',
                address: accounts[0],
                status: true
            }
        } catch (error) {
            return {
                message: 'Failed to Authenticate',
                error: error,
                status: false
            }
        }
    },
    switchToFantomTestnet: async function() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xfa2' }],
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0xfa2',
                            chainName: 'Fantom - Testnet',
                            nativeCurrency: {
                                name: 'Fantom',
                                symbol: 'FTM',
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://testnet.ftmscan.com'],
                            rpcUrls: ['https://fantom-testnet.public.blastapi.io'],
                        }, ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    },
    switchToPolygonTestnet: async function() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x13881' }],
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x13881',
                            chainName: 'Mumbai',
                            nativeCurrency: {
                                name: 'Polygon',
                                symbol: 'MATIC', // 2-6 characters long
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://mumbai.polygonscan.com'],
                            rpcUrls: ['https://polygon-mumbai.g.alchemy.com/v2/-p7aGEm_G-s1dprQ3GRtQcahJ7niGvTN'],
                        }, ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    },
    switchToAvalancheTestnet: async function() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xa869' }],
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0xa869',
                            chainName: 'Avalanche - Testnet',
                            nativeCurrency: {
                                name: 'Avalanche',
                                symbol: 'AVAX',
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://testnet.snowtrace.io'],
                            rpcUrls: ['https://ava-testnet.public.blastapi.io/ext/bc/C/rpc'],
                        }, ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    },
    switchToEthereumTestnet: async function() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x5' }],
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x5',
                            chainName: 'Goerli',
                            nativeCurrency: {
                                name: 'Ethereum',
                                symbol: 'ETH',
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://goerli.etherscan.io'],
                            rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
                        }, ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    },
    switchToBinanceTestnet: async function() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x61' }],
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x61',
                            chainName: 'Smart Chain - Testnet',
                            nativeCurrency: {
                                name: 'Binance',
                                symbol: 'BNB', // 2-6 characters long
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://testnet.bscscan.com'],
                            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                        }, ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    }
}

export default Authenticate
