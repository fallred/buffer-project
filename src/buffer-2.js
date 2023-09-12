const buf = Buffer.from('Hello')
console.log(buf);
console.log(buf.toString())
// Prints: "Hello"

// 从第3个位置开始写入'LLO'字符
// buf.write('LLO', 2);
// buf.write('LLO!', 2);
// console.log("HeLLO")
const dataView = new DataView(buf.buffer);
dataView.byteLength = 10;

buf.write('wordwww!');
console.log(buf.toString())


