const registry = {
  mqttClient: {
    options: {
      protocol: "tcp",
      slashes: true,
      auth: null,
      host: "mqtt-cn-v0h1klv0a02.mqtt.aliyuncs.com:1883",
      port: 1883,
      hostname: "mqtt-cn-v0h1klv0a02.mqtt.aliyuncs.com",
      hash: null,
      search: null,
      query: {},
      pathname: null,
      path: null,
      href: "tcp://mqtt-cn-v0h1klv0a02.mqtt.aliyuncs.com:1883",
      username: "Signature|LTAI5tKFgQXCiWwsDTkVV7DY|mqtt-cn-v0h1klv0a02",
      clientId: "GID-win-client-test-01@@@1688850426560064",
      connectTimeout: 5000,
      password: "4tVzAtm4iTtUs79Rey0L2HW75N0=",
      reconnectPeriod: 0,
      defaultProtocol: "tcp",
      keepalive: 60,
      reschedulePings: true,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      resubscribe: true,
      customHandleAcks: function () {
        arguments[3](0);
      },
    },
    streamBuilder: function wrapper(client) {
      if (opts.servers) {
        if (
          !client._reconnectCount ||
          client._reconnectCount === opts.servers.length
        ) {
          client._reconnectCount = 0;
        }

        opts.host = opts.servers[client._reconnectCount].host;
        opts.port = opts.servers[client._reconnectCount].port;
        opts.protocol = !opts.servers[client._reconnectCount].protocol
          ? opts.defaultProtocol
          : opts.servers[client._reconnectCount].protocol;
        opts.hostname = opts.host;

        client._reconnectCount++;
      }

      debug("calling streambuilder for", opts.protocol);
      return protocols[opts.protocol](client, opts);
    },
    messageIdProvider: {
      nextId: 32856,
    },
    outgoingStore: {
      options: {
        clean: true,
      },
      _inflights: {},
    },
    incomingStore: {
      options: {
        clean: true,
      },
      _inflights: {},
    },
    queueQoSZero: true,
    _resubscribeTopics: {},
    messageIdToTopic: {},
    pingTimer: null,
    connected: false,
    disconnecting: false,
    queue: [],
    connackTimer: {
      _idleTimeout: 5000,
      _idlePrev: {
        _idleNext: [Circular],
        _idlePrev: [Circular],
        expiry: 12719,
        id: -9007199254740981,
        msecs: 5000,
        priorityQueuePositi,
      },
    },
  },
};
这个registry.mqttclient ,子进程传递给主进程报错

// 收到c++给服务端消息
function cloudFlowOutBound() {

}
// 收到c++给前端的消息
function frontFlowOutBound() {

}


// 收到mqtt消息
function recieveMqttMsg(message) {

}
// 收到c++消息
function recieveCMsg(message) {

}
// 收到前端消息
function recieveFrontMsg(message) {

}

nodejs中这3个数据流怎么用rxjs实现这3种数据流处理
1. c++消息是调用c++动态链接库函数获Clibrary.IpcClientRecvMessag取到的, 要每隔500ms 获取1次，获取消息前还要判断IpcSelectCltChannel 这个函数返回值，这种用exjs怎么优雅实现
function run() {
  try {
    await sleep(100);
    // 系统时间
    const createTime = new Date().getTime();
    const pipeCode = wrapper.pipeCode;
    const selectCode = Clibrary.IpcSelectCltChannel(pipeCode);
    // ipc通道连接失败
    if (selectCode == 0) {
        await sleep(500);
        loop(wrapper);
        return;
    }
    if (!wrapper || !wrapper.id) {
        logUtil.customLog('逆向wrapper出问题');
        return;
    }
    // 关闭ipc通道的回调
    if (selectCode < 0) {
        closeIpcConnect(pipeCode, selectCode, wrapper);
        return;
    }
    const message = Clibrary.IpcClientRecvMessage(pipeCode, selectCode);
    recieveCMsg(message);
    await loop(wrapper);
}
catch(error) {}
}

2.前端消息是ws收到消息
const server = new WebSocket.Server({ host: Host, port: candidatePort });
server.on('connection', (connection) => {
    connection.on('message', message => {
        recieveFrontMsg(message);
    });
});

3.mq消息是
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
    recieveMqttMsg(message);
});
  
// 错误事件
client.on('error', (error) => {
    console.error('on error:', error);
});

client.on('close', function() {
    console.log('on close:');
});



如果接收到前端userlist消息，并且同时收到收到c++的getConversations消息和getRoommemrbers消息。要统一做一些数据处理，用rxjs如何实现