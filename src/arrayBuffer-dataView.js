const buffer = new ArrayBuffer(16);
console.log('buffer:', buffer);
const view = new DataView(buffer);
console.log('view:', view);
console.log('view.buffer:', view.buffer);
view.setInt8(2, 42);
console.log(view.getInt8(2)); // 42