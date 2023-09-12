const WebSocketServer = require('../websocket/index');
const frontConnection = require('../cache/frontConnection');
// const frontFlowInBound = require('../../dispatch-center/dispatch/frontFlowInBound');

const frontServer = {
    start() {
        // 先启动ws服务器。
        WebSocketServer.startServer().then(() => {
            console.log(WebSocketServer.port);
        });
        
        WebSocketServer.server.on('connection', (connection) => {
            
            // 监听前端发来的消息
            connection.on('message', message => {
                const msgObj = message ? JSON.parse(message) : null;
                console.log(`收到前端WS消息message: ${message}`);
                if (msgObj) {
                    if (msgObj.cmdId === 'system') {
                        if (msgObj.body === 'online') {
                            console.log('Frontend online');
                            frontConnection.channel = connection;
                            frontConnection.isLogin = true;
                        } else if (msgObj.body === 'offline') {
                            console.log('Frontend offline');
                            frontConnection.channel = null;
                            frontConnection.isLogin = false;
                        }
                    }
                    else {
                        // frontFlowInBound(null, null, message);
                    }
                }
            })
        });
    },
    stop() {
        WebSocketServer.stopServer();
    }
}
module.exports = frontServer;

