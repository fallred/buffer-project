const { Observable } = require('rxjs');
const mqtt = require('mqtt');

// 创建 MQTT 客户端
const brokerUrl = 'mqtt://localhost:1883';
const topic = 'mytopic';
const options = {
  clientId: 'subscriber'
};
const client = mqtt.connect(brokerUrl, options);

// 创建 MQTT 消息的 Observable
const mqttMsgObservable = new Observable(subscriber => {
  client.on('message', (topic, message) => {
    // 在 Observable 中发送 MQTT 消息
    subscriber.next(message);
  });
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // 订阅主题
  client.subscribe(topic, { qos: 1 }, err => {
    if (err) {
      console.error('Subscribing to topic error:', err);
    } else {
      console.log('Subscribed to topic successfully');
    }
  });
});

mqttMsgObservable.subscribe(message => {
  // 处理 MQTT 消息
  recieveMqttMsg(message);
});