const WebSocketServer = require('./websocket');
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
            })
        });
    },
    stop() {
        WebSocketServer.stopServer();
    }
}
module.exports = frontServer;

