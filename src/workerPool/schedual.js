const cron = require('node-cron');
const pingTimer = require('./timer/pingTimer');

// 定时任务
function scheduleRun() {
    // 创建定时任务，每10秒钟执行1次
    cron.schedule('*/10 * * * * *', () => {
      // 60000
      pingTimer.ping();
    });
}

module.exports = scheduleRun;
