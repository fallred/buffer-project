const mqtt = require('mqtt');

// // MQTT代理服务器的地址
const brokerUrl = 'mqtt://localhost:1883';
const topic = 'mytopic';
const options = {
  clientId: 'publisher'
};
// const message = 'Hello, MQTT!';

const client = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  publishMessages(() => {
    // 所有消息都已发送完毕后执行
    client.end();
  });
});

client.on('error', (error) => {
  console.error('Error:', error);
});

// 循环发布消息的函数
function publishMessages(callback) {
  let count = 0;

  function publishNextMessage() {
    if (count >= 2000) {
      // 所有消息都已发送完毕
      callback();
      return;
    }

    const message = `Message ${count + 1}`;
    client.publish(topic, message, (err) => {
      if (err) {
        console.error('Failed to publish message:', err);
      } else {
        console.log(`Published message: ${message}`);
      }

      count++;
      publishNextMessage();
    });
  }

  publishNextMessage();
}