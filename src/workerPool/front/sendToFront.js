
const frontConnection = require('../cache/frontConnection');

// 发送消息到前端
function sendResponse2Front(taskType, response) {
    const message = JSON.stringify(response);
    if (frontConnection.channel) {
        frontConnection.channel.send(message, error => {
            if (error) {
                console.log(`发送前端WS消息失败, error: ${JSON.stringify(error)}`);
            }
            else {
                console.log(`发送前端WS消息：${message}！`);
            }
        });
    }
    else {
        console.log(`[SendToFrontUtil.run] - 通知前端${taskType}失败, response=${message}`);
    }
}
function sendToFront(message) {
    // 封装Response协会到客户端
    // 这里包含转发+逆向主动上报的消息
    let response = {
        cmdId: 'forward',
        channelId: 111,
        wxid: 222,
        body: JSON.parse(message),
    };
    sendResponse2Front("", response);
}

module.exports = sendToFront;