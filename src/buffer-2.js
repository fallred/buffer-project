const buf = Buffer.from('Hello')

console.log(buf.toString())
// Prints: "Hello"

// 从第3个位置开始写入'LLO'字符
// buf.write('LLO', 2);
buf.write('LLO!', 2);
// console.log("HeLLO")
console.log(buf.toString())