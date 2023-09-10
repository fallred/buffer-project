const { parentPort, workerData } = require('worker_threads');
const registryConfig = require('./registryConfig').getInstance();

// 监听主线程发来的消息
parentPort.on('message', (message) => {
    if (message.type === 'init') {
        // 初始化，接收主线程传递的消息通道端口
        const { port } = message;
        
        // 监听消息通道端口的消息
        port.on('message', async messageData => {
            try {
                console.log(`worker on message: ${JSON.stringify(messageData.task)}`);
                port.postMessage(11);
            }
            catch(error) {
                console.log('on message error:', error);
            }
        });
    }
    if (message.type === 'updateRegistryList') {
        if (message.registryList) {
            registryConfig.updateRegistryList(message.registryList);
            const registryListTemp = registryConfig.getRegistryList();
            console.log(`worker on message registryListTemp: ${JSON.stringify(registryListTemp)}`);
        }
    }
});
