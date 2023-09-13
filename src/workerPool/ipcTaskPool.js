const {isMainThread, workerData} = require('worker_threads');

const MyObject = (() => {
    let instance;
    function createInstance() {
        // const os = require('os');
        const WorkerPool = require('./workerPool');
        const poolInstance = new WorkerPool(__dirname + '/worker.js', 1);
    
        function notifyMain(type, updateData) {
            const kWorkerChannel = 'kWorkerChannel';
            poolInstance.workers.forEach(worker => {
                worker[kWorkerChannel].port1.postMessage({type, updateData});
            });
        }
        function notifyWorkers(notifyData) {
            const {type, updateData} = notifyData;
            if (isMainThread) {
                poolInstance.workers.forEach(worker => {
                    worker.postMessage(notifyData);
                });
            } else {
                notifyMain(type, updateData);
            }
        }
        function notifyResponse(notifyData) {
            const kWorkerChannel = 'kWorkerChannel';
            poolInstance.workers.forEach(worker => {
                const messageChannel = worker[kWorkerChannel];
                if (messageChannel) {
                    messageChannel.port1.postMessage({notifyData});
                }
            });
        }
        
        const obj = {
            poolInstance,
            notifyWorkers,
            notifyResponse,
        };
        return obj;
    }
    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();
module.exports = MyObject;