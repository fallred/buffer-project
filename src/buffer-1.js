const buf1 = Buffer.alloc(10);
// buf1.fill(0);
console.log('buf1:', buf1);


let buf2 = Buffer.allocUnsafe(6);
buf2.write('张',0,3,'utf8');
buf2.write('三',3,3,'utf8'); 
console.log('buf2:', buf2.toString());//张三



let buf3 = Buffer.alloc(4);
buf3.writeInt8()
buf3.writeInt8(0,0);
buf3.writeInt8(16,1);
buf3.writeInt8(32,2);
buf3.writeInt8(48,3);
console.log(buf3);// <Buffer 00 10 20 30>  
//0000 0000   0001 0000   0010 0000    0011 0000
console.log(buf3.readInt8(0));//0
console.log(buf3.readInt8(1));//16
console.log(buf3.readInt8(2));//32
console.log(buf3.readInt8(3));//48