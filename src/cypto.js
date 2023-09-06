const crypto = require('crypto');

// 加密函数
function encrypt(buffer, password) {
  const iv = crypto.randomBytes(16); // 生成随机的初始化向量
  const cipher = crypto.createCipheriv('aes-256-cbc', password, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]);
}

// 解密函数
function decrypt(buffer, password) {
  const iv = buffer.slice(0, 16); // 从缓冲区中提取初始化向量
  const encryptedData = buffer.slice(16); // 从缓冲区中提取加密后的数据
  const decipher = crypto.createDecipheriv('aes-256-cbc', password, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  return decrypted;
}

// 测试加密和解密
const originalData = Buffer.from('Hello, World!', 'utf8');
const password = 'SecretPassword';

const encryptedData = encrypt(originalData, password);
console.log('Encrypted Data:', encryptedData.toString('hex'));

const decryptedData = decrypt(encryptedData, password);
console.log('Decrypted Data:', decryptedData.toString('utf8'));