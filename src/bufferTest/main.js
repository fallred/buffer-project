const { Worker } = require('worker_threads');
const path = require('path');

const size = 1073741823;
// const largeData = Buffer.alloc(size); // 1 GB

const largeData = Buffer.allocUnsafe(size).fill(12);

// const uint8Array = new Uint8Array(buffer.buffer);
const chunkSize = 1024 * 1024; // 1 MB
const workerPath = path.resolve(__dirname, './worker.js');
const worker = new Worker(workerPath, { workerData: { chunkSize } });

worker.on('message', (message) => {
  if (message.type === 'result') {
    const completeBuffer = message.completeBuffer;
    console.log('Received complete buffer from worker:', completeBuffer);
  }
});

worker.postMessage({ chunk: largeData });
// 向子线程发送数据块
// for (let offset = 0; offset < largeData.length; offset += chunkSize) {
//   const chunk = largeData.slice(offset, offset + chunkSize);
//   console.log('main post offset:', offset);
//   worker.postMessage({ chunk });
// }