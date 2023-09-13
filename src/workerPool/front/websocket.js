const WebSocket = require('ws');
const frontClientCache = require('../cache/frontClientCache');
const notifyWorkerAndMain = require('../notify');

const portRange = [13323, 13423];
const Host = 'localhost';

const WebSocketServer = {
  port: null,
  client: null,
  server: null,
  getPortList() {
    const portList = Array.from({length: portRange[1] - portRange[0] +1}, (_, i) => i + portRange[0]);
    return portList;
  },
  async startServer() {
    let port = null;
    let portIndex = 0;
    const portList = this.getPortList();
    while (!port) {
      const candidatePort = portList[portIndex];
      try {
        this.server = new WebSocket.Server({ host: Host, port: candidatePort });
        this.server.on('connection', this.handleConnection.bind(this));
        await new Promise(resolve => this.server.once('listening', resolve));
        port = candidatePort;
      } catch (error) {
        // 端口被占用，尝试下一个端口
        console.log('websocket.server error');
      }
      portIndex += 1;
    }
    this.port = port;
    console.log(`WebSocket server started on ${Host}:${this.port}`);
  },
  handleConnection(connection) {
    this.client = connection;
    frontClientCache.frontConnection.channel = connection;
    notifyWorkerAndMain({ type: 'updateWsCache', updateData: frontClientCache.frontConnection });
    connection.send('欢迎连接到websocket服务器');
    connection.on('close', () => {
      this.client = null;
      frontClientCache.frontConnection.channel = null;
      notifyWorkerAndMain({ type: 'updateWsCache', updateData: frontClientCache.frontConnection });
      console.log(`Client disconnected. `);
    });
  },
  async stopServer() {
    await new Promise(resolve => this.server.close(resolve));
    console.log('WebSocket server stopped');
  }
}
module.exports = WebSocketServer;

