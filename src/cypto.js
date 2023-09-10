const crypto = require('crypto');

// 加密函数
function encrypt(buffer, password) {
  const iv = crypto.randomBytes(16); // 生成随机的初始化向量
  const key = crypto.createHash('sha256').update(password).digest(); // 生成32字节的密钥
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]);
}

// 解密函数
function decrypt(buffer, password) {
  const iv = buffer.slice(0, 16); // 从缓冲区中提取初始化向量
  const encryptedData = buffer.slice(16); // 从缓冲区中提取加密后的数据
  const key = crypto.createHash('sha256').update(password).digest(); // 生成32字节的密钥
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  return decrypted;
}

// 测试加密和解密
const originalData = Buffer.from('Hello, World!', 'utf8');
const password = 'SecretPassword';

const encryptedData = encrypt(originalData, password);
console.log('Encrypted encryptedData:', encryptedData); // Encrypted encryptedData: <Buffer 42 b5 05 20 1d 73 e2 17 7f 79 05 56 e9 35 86 16 3c 93 4a ec c6 98 44 e0 54 5e 93 4a 96 5c bc 69>
// console.log('Encrypted Data:', encryptedData.toString('hex'));

const decryptedData = decrypt(encryptedData, password);
console.log('Decrypted Data:', decryptedData.toString('utf8')); // Decrypted Data: Hello, World!