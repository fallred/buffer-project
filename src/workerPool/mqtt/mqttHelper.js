const mqtt = require('mqtt');
const mqttClientCache = require('../cache/mqttClientCache');
const notifyWorkerAndMain = require('../notify');

// MQTT代理服务器的地址
const brokerUrl = 'mqtt://localhost:1883';
const topic = 'mytopic';
const options = {
    clientId: 'subscriber'
};

const registryClient = (clientNew) => {
  console.log('registryClient');
  if (mqttClientCache.registry?.client) {
      // 如果存在则关闭之前缓存的连接
      if (mqttClientCache.registry.client.end) {
          mqttClientCache.registry.client.end();
      }
      mqttClientCache.registry.client = null;
  }
  mqttClientCache.registry.client = clientNew;
  notifyWorkerAndMain({ type: 'updateMqttCache', updateData: mqttClientCache.registry });
}
function initMqttClient() {
    if (mqttClientCache.registry.isConnected) {
        return;
    }
    const client = mqtt.connect(brokerUrl, options);
    mqttClientCache.registry.isConnected = true;
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
        mqttClientCache.registry.isConnected = false;
        mqttClientCache.registry.client = null;
        notifyWorkerAndMain({ type: 'updateMqttCache', updateData: mqttClientCache.registry });
    });
}
function clearClientConnection() {
  console.log('clearClientConnection:');
  if (mqttClientCache.registry.client && mqttClientCache.registry.client.end) {
    console.log('clearClientConnection close ing:');
    mqttClientCache.registry.client.end();
  }
  mqttClientCache.registry.client = null;
  notifyWorkerAndMain({ type: 'updateMqttCache', updateData: mqttClientCache.registry });
}
// 手动触发重新连接
function reconnectMqttClient() {
  if (mqttClientCache.registry.client) {
    mqttClientCache.registry.client.reconnect();
  }
}
module.exports = {
  initMqttClient,
  clearClientConnection
};
