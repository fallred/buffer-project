const { parentPort, workerData } = require('worker_threads');
const mqttHelper = require('./mqtt/mqttHelper');
const frontClientCache = require('./cache/frontClientCache');

const registryConfig = require('./registryConfig').getInstance();


function notifyMain(notifyData) {
    parentPort.postMessage(notifyData);
}

async function workerRun(workerData) {
    // 模拟登陆
    // mqttHelper.initMqttClient();

    setTimeout(() => {
        const channel = frontClientCache.frontConnection.channel;
    }, 10000);
}

// 监听主线程发来的消息
parentPort.on('message', (message) => {
    if (message.type === 'init') {
        // 初始化，接收主线程传递的消息通道端口
        const { port } = message;
        
        // 监听消息通道端口的消息
        port.on('message', async message => {
            try {
                console.log(`worker on message: ${JSON.stringify(message.task)}`);
                workerRun(message);
                // parentPort.postMessage('11');
            }
            catch(error) {
                console.log('on message error:', error);
            }
        });
    }
    // 更新全局数据，cache缓存等
    if (message.type === 'updateRegistryList') {
        if (message.updateData) {
            registryConfig.updateRegistryList(message.updateData);
            const registryListTemp = registryConfig.getRegistryList();
            console.log(`worker on message registryListTemp: ${JSON.stringify(registryListTemp)}`);
        }
    }

    if (message.type === 'updateWsCache') {
        const {updateData} = message ?? {};
        frontClientCache.updateFrontClient(updateData);
    }
});

/*
parentPort.on('message', (message) => {
    console.log(`on message: ${message}`);
    if (message.type === 'init') {
        workerRun(message);
        parentPort.postMessage('11');
    }
    // 更新全局数据，cache缓存等
    if (message.type === 'updateRegistryList') {
        if (message.updateData) {
            registryConfig.updateRegistryList(message.updateData);
            const registryListTemp = registryConfig.getRegistryList();
            console.log(`worker on message registryListTemp: ${JSON.stringify(registryListTemp)}`);
        }
    }

    if (message.type === 'updateWsCache') {
        const {updateData} = message ?? {};
        frontClientCache.updateFrontClient(updateData);
    }
});
*/