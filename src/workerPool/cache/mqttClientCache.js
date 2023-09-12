let registry = {client: null, isConnected: false};

function updateRegistry(registryData) {
    registry = registryData;
}

module.exports = {
    registry,
    updateRegistry
};