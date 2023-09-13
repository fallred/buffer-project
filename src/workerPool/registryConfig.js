const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const ipcTaskPoolClosure = require('./ipcTaskPool');

let registryList = [];

// function notifyWorker(workerPool) {
//     workerPool.workers.forEach(worker => {
//         worker.postMessage({type: 'updateRegistryList', updateData: registryList});
//     });
// }

function add(registry, workerPool) {
    // initRegistryList();
    registryList.push(registry);
    const ipcTaskPool = ipcTaskPoolClosure.getInstance();
    ipcTaskPool.notifyWorkers({type: 'updateRegistryList', updateData: registryList});
}

function remove(registry, workerPool) {
    // initRegistryList();
    registryList = registryList.filter(item => item.id !== registry?.id);
    notifyWorker(workerPool);
}
function updateRegistryList(updateList) {
    registryList = updateList;
}
function getRegistryList() {
    // initRegistryList();
    return registryList.map(registry => ({...registry}));
}
const MyObject = (() => {
    let instance;

    function init() {
        // 在这里可以进行初始化操作
        // ...

        // 返回公共接口
        return {
            add,
            remove,
            getRegistryList,
            updateRegistryList
        };
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = init();
            }
            return instance;
        },
    };
})();
// 单例模式，确保只有一个实例
module.exports = MyObject; 