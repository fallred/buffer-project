const mqtt = require('mqtt');
// MQTT代理服务器的地址
const brokerUrl = 'mqtt://localhost:1883';
const topic = 'mytopic';
const options = {
    clientId: 'subscriber'
};

const client = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
  console.log('on connected to MQTT broker');

  // 订阅主题
  client.subscribe(topic, {qos: 1}, (err) => {
    if (err) {
      console.error('subscribing to topic error:', err);
    } else {
      console.log('subscribed to topic success');
    }
  });
});

// 消息到达事件
client.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
});
  
// 错误事件
client.on('error', (error) => {
    console.error('on error:', error);
});

client.on('close', function() {
    console.log('on close:');
});