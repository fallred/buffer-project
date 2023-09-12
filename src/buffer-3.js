const buf = Buffer.from('Hello');
console.log(buf.toString()); // 输出: "Hello"

const newLength = 10;
const newBuf = Buffer.alloc(newLength); // 创建新的缓冲区，长度为10字节

buf.copy(newBuf); // 将原始缓冲区的内容复制到新的缓冲区

console.log(newBuf.toString()); // 输出: "Hello     "（注意: 添加了空格）

// 修改新缓冲区的内容
newBuf.write('world!', 6);
console.log(newBuf.toString()); // 输出: "Hello world!"