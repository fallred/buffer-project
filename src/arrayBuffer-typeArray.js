const typeArray1 = new Int8Array(8);
typeArray1[0] = 32;
console.log('typeArray1:', typeArray1);

const typeArray2 = new Int8Array(typeArray1);
typeArray2[1] = 42;
console.log('typeArray1:', typeArray1);
console.log('typeArray2:', typeArray2);

// 1.将 TypedArray 转换为 Buffer：
const buffer1 = Buffer.from(typeArray1.buffer);
console.log('buffer1:', buffer1);

// 2.将 TypedArray 转换为 ArrayBuffer：
const arrayBuffer1 = typeArray1.buffer;
console.log('arrayBuffer1:', arrayBuffer1);

// 3.DataView 与 TypedArray 和 Buffer 的联系：
// DataView传入的是arrayBuffer
const dataView1 = new DataView(typeArray1.buffer);
console.log('dataView1:', dataView1);

// 4.也可以使用 `Buffer` 对象的底层 `ArrayBuffer` 创建 `DataView
const dataView2 = new DataView(buffer1.buffer);
console.log('dataView2:', dataView2);