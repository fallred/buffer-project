const WebSocket = require('ws');
const frontConnection = require('../cache/frontConnection');

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
      }
      portIndex += 1;
    }
    this.port = port;
    console.log(`WebSocket server started on ${Host}:${this.port}`);
  },
  handleConnection(connection) {
    this.client = connection;
    frontConnection.channel = connection;
    connection.send('欢迎连接到websocket服务器');
    connection.on('close', () => {
      this.client = null;
      frontConnection.channel = null;
      console.log(`Client disconnected. `);
    });
  },
  async stopServer() {
    await new Promise(resolve => this.server.close(resolve));
    console.log('WebSocket server stopped');
  }
}
module.exports = WebSocketServer;

