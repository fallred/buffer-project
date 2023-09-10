let fs = require('fs');
const path = require('path');

const readFilePath = path.resolve(__dirname, './1-3.txt');
let rs = fs.createReadStream(readFilePath, {
  highWaterMark: 11, // 字节
  flags:'r',
  autoClose:true, // 默认读取完毕后自动关闭
  start:0,
  encoding:'utf8'
});
// 默认创建一个流 是非流动模式，默认不会读取数据
// 我们需要接收数据 我们要监听data事件，数据会总动的流出来
rs.on('error',function (err) {
  console.log(err)
});
rs.on('open',function () {
  console.log('文件打开了');
});
// 内部会自动的触发这个事件 rs.emit('data');
let data = '';
rs.on('data',function (chunk) {
  data += chunk;
  console.log(data);
});
rs.on('end',function () {
  console.log('读取完毕了');
});
rs.on('close',function () {
  console.log('关闭')
});