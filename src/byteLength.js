const str = '你好'; // 包含两个汉字的字符串
// const byteLength = Buffer.byteLength(str, 'utf16le');
const byteLength = Buffer.byteLength(str, 'utf32le');
console.log(byteLength); // 输出 6