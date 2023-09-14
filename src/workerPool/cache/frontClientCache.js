let frontConnection = {
    // 前端掉线,前端退出通宝账号
    login: false,
    channel: null,
    port: null,
};
function updateFrontClient(connectionTemp) {
    frontConnection = connectionTemp;
}
module.exports = {
    frontConnection,
    updateFrontClient
};
