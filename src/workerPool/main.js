
const WorkerPool = require('./workerPool');
const asyncSelectPool = new WorkerPool(__dirname + '/worker', 1, false);
const registryConfig = require('./registryConfig').getInstance();

function run() {
    const pipeLineWrapper = {
        pipeCode: 1001,
        id: 2001,
        processId: 2001,
        available: false,
        workWx: true,
        createTime: new Date().getTime(),
    };
    const registry = {
        pipeLineWrapper,
        sendToCloudFlag: false,
        id: 2001,
        scanTime: new Date().getTime(),
        workWx: true,
    };
    registryConfig.add(registry, asyncSelectPool);
    asyncSelectPool.runTask(pipeLineWrapper, (error, result) => {
        if (error) {
            console.log('worker err');
        }
        else {
            console.log('worker res');
        }
    });
    // setTimeout(() => {
    //     registryConfig.remove(registry);
    // }, 1000);
}

run();