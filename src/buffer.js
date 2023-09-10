// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);
console.log('buf1:', buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>
// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);
console.log('buf2:', buf2); // <Buffer 01 01 01 01 01 01 01 01 01 01>
// 创建一个长度为 10、且未初始化的 Buffer。
const buf3 = Buffer.allocUnsafe(10);
console.log('buf3:', buf3); // <Buffer 18 8f 00 08 01 00 00 00 08 00>


const buf4 = Buffer.from([1, 2, 3]);
console.log('buf4:', buf4);// buf4: <Buffer 01 02 03>

const buf5 = Buffer.from('你好啊');
console.log('buf5:', buf5);// buf5: <Buffer e7 8f a0 e5 b3 b0 e5 9f b9 e8 ae ad>