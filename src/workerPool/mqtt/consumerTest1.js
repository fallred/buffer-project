const mqtt = require('mqtt');
// MQTT代理服务器的地址
const brokerUrl = 'mqtt://localhost:1883';
const topic = 'mytopic';
const options = {
    clientId: 'subscriber'
};

const registry = {client: null, isConnected: false};

const registryClient = (clientNew) => {
  console.log('registryClient');
  if (registry?.client) {
      // 如果存在则关闭之前缓存的连接
      if (registry.client.end) {
          registry.client.end();
      }
      registry.client = null;
  }
  registry.client = clientNew;
}
function initMqttClient() {
    if (registry.isConnected) {
        return;
    }
    const client = mqtt.connect(brokerUrl, options);
    registry.isConnected = true;
    registryClient(client);
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
        registry.isConnected = false;
        registry.client = null;
    });
}
function clearClientConnection() {
  console.log('clearClientConnection:');
  // if(isClear) {
  //   return;
  // }
  if (registry.client && registry.client.end) {
    console.log('clearClientConnection close ing:');
    registry.client.end();
  }
  registry.client = null;
  // isClear = true;
}
// 手动触发重新连接
function reconnectMqttClient() {
  if (registry.client) {
    registry.client.reconnect();
  }
}
module.exports = {
  initMqttClient,
  clearClientConnection
};
