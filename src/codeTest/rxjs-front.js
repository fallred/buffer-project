const { Observable } = require('rxjs');
const WebSocket = require('ws');

// 创建 WebSocket 服务器
const server = new WebSocket.Server({ host: Host, port: candidatePort });

// 创建前端消息的 Observable
const frontMsgObservable = new Observable(subscriber => {
  server.on('connection', connection => {
    connection.on('message', message => {
      // 在 Observable 中发送前端消息
      subscriber.next(message);
    });
  });
});

frontMsgObservable.subscribe(message => {
  // 处理前端消息
  recieveFrontMsg(message);
});