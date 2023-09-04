const { parentPort, workerData } = require("worker_threads");

// const chunkSize = workerData.chunkSize;

// let completeBuffer = Buffer.alloc(0);
// let totalLength = 0;

parentPort.on("message", (message) => {
  console.log("worker on message:");
  const { chunk } = message;
  const buffer = Buffer.from(chunk);
  const arrayBuffer = buffer.buffer;
  console.log("worker get chunk:", chunk);
//   totalLength += chunk.length;
//   completeBuffer = Buffer.concat([completeBuffer, chunk]);

//   if (totalLength >= 1073741823) {
//     console.log("worker on message result:", completeBuffer);
//     parentPort.postMessage({ type: "result", completeBuffer });
//   }
});
