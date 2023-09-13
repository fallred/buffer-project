const WebSocketServer = require('./websocket');
const frontClientCache = require('../cache/frontClientCache');
// const frontFlowInBound = require('../../dispatch-center/dispatch/frontFlowInBound');

const frontServer = {
    start() {
        // 先启动ws服务器。
        WebSocketServer.startServer().then(() => {
            console.log(WebSocketServer.port);
        });
        
        // WebSocketServer.server.on('connection', (connection) => {
        //     if (msgObj) {
        //         if (msgObj.cmdId === 'system') {
        //             if (msgObj.body === 'online') {
        //                 console.log('Frontend online');
        //                 frontClientCache.frontConnection.channel = connection;
        //                 frontClientCache.frontConnection.isLogin = true;
        //                 notifyWorkerAndMain({ type: 'updateWsCache', updateData: frontClientCache.frontConnection });
        //             } else if (msgObj.body === 'offline') {
        //                 console.log('Frontend offline');
        //                 frontClientCache.frontConnection.channel = null;
        //                 frontClientCache.frontConnection.isLogin = false;
        //                 notifyWorkerAndMain({ type: 'updateWsCache', updateData: frontClientCache.frontConnection });
        //             }
        //         }
        //         else {
        //             frontFlowInBound(null, null, message);
        //         }
        //     }
        //     // 监听前端发来的消息
        //     connection.on('message', message => {
        //         const msgObj = message ? JSON.parse(message) : null;
        //         console.log(`收到前端WS消息message: ${message}`);
        //     })
        // });
    },
    stop() {
        WebSocketServer.stopServer();
    }
}
module.exports = frontServer;

