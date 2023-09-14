

const frontServer = require('./front/frontServer');
const scheduleRun = require('./schedual');
// const mqttHelper = require('./mqtt/mqttHelper');
const mqttClientCache = require('./cache/mqttClientCache');
// const frontClientCache = require('./cache/frontClientCache');

const ipcTaskPoolClosure = require('./ipcTaskPool');

// const WorkerPool = require('./workerPool');
// const asyncSelectPool = new WorkerPool(__dirname + '/worker.js', 1);

const registryConfig = require('./registryConfig').getInstance();

function reverseRun() {
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
    registryConfig.add(registry);
    // asyncSelectPool.runTask(pipeLineWrapper, (error, result) => {
    //     if (error) {
    //         console.log('worker err');
    //     }
    //     else {
    //         console.log('worker res');
    //     }
    // });
    const ipcTaskPool = ipcTaskPoolClosure.getInstance();
    const poolInstance = ipcTaskPool.poolInstance;
    poolInstance.runTask(pipeLineWrapper, (error, result) => {
        if (error) {
            console.log('worker err');
        }
        else {
            console.log('worker res');
        }
    });
    poolInstance.workers.forEach(worker => {
        worker.on('message', (result) => {
            if (result.type === 'updateMqttCache') {
                const {updateData} = result ?? {};
                mqttClientCache.updateRegistry(updateData);
            }

            // if (result.type === 'updateWsCache') {
            //     const {updateData} = result ?? {};
            //     frontClientCache.updateFrontClient(updateData);
            // }
        });
    });
}

function run() {
    try {
        reverseRun();
        frontServer.start();
        // mqttHelper.initMqttClient();
        scheduleRun();
    }
    catch(error) {
        console.log('main run error');
    }
}

run();