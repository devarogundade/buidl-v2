const Network = {
    current: function() {
        if (typeof(Storage) !== "undefined") {
            return localStorage.getItem('network')
        }
        return 5
    },
    updateNetwork: function(chainId) {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('network', chainId)
        }
    }
}

export default Network
