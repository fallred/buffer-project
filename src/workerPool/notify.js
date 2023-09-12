const {isMainThread, workerData, parentPort} = require('worker_threads');

function notifyWorkerAndMain(notifyData) {
    if (isMainThread) {
        poolInstance.workers.forEach(worker => {
            worker.postMessage(notifyData);
        });
    } else {
        parentPort.postMessage(notifyData);
    }
}
module.exports = notifyWorkerAndMain;