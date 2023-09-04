// const buffer = new ArrayBuffer(32);
// console.log('buffer:', buffer);

// buffer转化为ArrayBuffer

const buffer = Buffer.from([1, 2, 3, 4, 5]);
const arrayBuffer = buffer.buffer;

console.log('arrayBuffer:', arrayBuffer)
console.log(arrayBuffer instanceof ArrayBuffer); // true
console.log(arrayBuffer.byteLength); // 5


// arrayBuffer转化为buffer
// const arrayBuffer = new Uint8Array([1, 2, 3, 4, 5]).buffer;
// const buffer = Buffer.from(arrayBuffer);

// console.log(buffer instanceof Buffer); // true
// console.log(buffer.length); // 5
// console.log(buffer); // <Buffer 01 02 03 04 05>