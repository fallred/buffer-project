const { AsyncResource } = require('async_hooks');
const { EventEmitter } = require('events');
const { Worker, MessageChannel, isMainThread } = require('worker_threads');
const { app } = require('electron');

// const kTaskInfo = Symbol('kTaskInfo');
// const kWorkerFreedEvent = Symbol('kWorkerFreedEvent');
// const kWorkerChannel = Symbol('kWorkerChannel');

const kTaskInfo = 'kTaskInfo';
const kWorkerFreedEvent = 'kWorkerFreedEvent';
const kWorkerChannel = 'kWorkerChannel';

const { type } = require('../../../common/urls');

const env = process.env.ELECTRON_NODE_ENV || type;

class WorkerPoolTaskInfo extends AsyncResource {
    constructor(callback) {
        super('WorkerPoolTaskInfo');
        this.callback = callback;
    }

    done(err, result) {
        this.runInAsyncScope(this.callback, null, err, result);
        this.emitDestroy();  // `TaskInfo`s are used only once.
    }
}

class WorkerPool extends EventEmitter {
    constructor(workerFile, numThreads) {
        super();
        this.workerFile = workerFile;
        this.numThreads = numThreads;
        this.workers = [];
        this.freeWorkers = [];
        this.tasks = [];

        for (let i = 0; i < numThreads; i++)
            this.addNewWorker();

        // Any time the kWorkerFreedEvent is emitted, dispatch
        // the next task pending in the queue, if any.
        this.on(kWorkerFreedEvent, () => {
            if (this.tasks.length > 0) {
                const { task, callback } = this.tasks.shift();
                this.runTask(task, callback);
            }
        });
    }

    addNewWorker() {
        // const registryList = RegistryConfig.getRegistryList();
        const worker = new Worker(this.workerFile, {
            workerData: {
                env: env,
                isPackaged: app?.isPackaged,
                version: require('../../../../package.json').version || app?.getVersion(),
                // registryList
            },
        });

        // Create a MessageChannel for communication
        const channel = new MessageChannel();
        worker[kWorkerChannel] = channel;

        // MessageChannel's port1 is used for sending messages from main thread to worker
        worker.postMessage({ type: 'init', port: channel.port1 }, [channel.port1]);

        // MessageChannel's port2 is used for receiving messages from worker
        channel.port2.on('message', (result) => {
            // 如果成功：调用传递给`runTask`的回调，删除与Worker关联的`TaskInfo`，并再次将其标记为空闲。
            // In case of success: Call the callback that was passed to `runTask`,
            // remove the `TaskInfo` associated with the Worker, and mark it as free
            // again.
            worker[kTaskInfo].done(null, result);
            // worker[kTaskInfo] = null;
            this.freeWorkers.push(worker);
            this.emit(kWorkerFreedEvent);
        });

        worker.on('error', (err) => {
            // 如果发生未捕获的异常：调用传递给 `runTask` 并出现错误的回调。
            // In case of an uncaught exception: Call the callback that was passed to
            // `runTask` with the err   or.
            if (worker[kTaskInfo]) {
                worker[kTaskInfo].done(err, null);
            }
            else {
                this.emit('error', err);
            }
            // 从列表中删除 Worker 并启动一个新的 Worker 来替换当前的 Worker。
            // Remove the worker from the list and start a new Worker to replace the
            // current one.
            this.workers.splice(this.workers.indexOf(worker), 1);
            this.addNewWorker();
        });
        this.workers.push(worker);
        this.freeWorkers.push(worker);
        this.emit(kWorkerFreedEvent);
    }

    runTask(task, callback) {
        if (this.freeWorkers.length === 0) {
            // 没有空闲线程，等待工作线程空闲。
            // No free threads, wait until a worker thread becomes free.
            this.tasks.push({ task, callback });
            return;
        }

        const worker = this.freeWorkers.pop();
        worker[kTaskInfo] = new WorkerPoolTaskInfo(callback);
        
        const channel = worker[kWorkerChannel];
        channel.port2.postMessage({
            type: 'run',
            task,
        });

    }

    close() {
        for (const worker of this.workers) {
            worker.terminate();
        }
    }
}
module.exports = WorkerPool;