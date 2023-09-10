const { interval, defer } = require('rxjs');
const { switchMap, filter, scan } = require('rxjs/operators');

function run() {
  interval(500).pipe(
    switchMap(() => defer(() => {
      const selectCode = Clibrary.IpcSelectCltChannel(wrapper.pipeCode);
      if (selectCode === 0) {
        return Promise.resolve(null); // 返回一个 resolved 的 Promise，表示没有消息
      } else if (selectCode < 0) {
        closeIpcConnect(wrapper.pipeCode, selectCode, wrapper);
        return Promise.resolve(null); // 返回一个 resolved 的 Promise，表示没有消息
      } else {
        const message = Clibrary.IpcClientRecvMessage(wrapper.pipeCode, selectCode);
        return Promise.resolve(message); // 返回一个 resolved 的 Promise，将消息作为结果
      }
    })),
    filter(message => message !== null), // 过滤掉没有消息的情况
    scan((acc, message) => {
      if (message.type === 'getconversations') {
        return { ...acc, getConversations: true };
      } else if (message.type === 'getroommembers') {
        return { ...acc, getRoomMembers: true };
      }
      return acc;
    }, { getConversations: false, getRoomMembers: false })
  ).subscribe(({ getConversations, getRoomMembers }) => {
    if (getConversations && getRoomMembers) {
      // 在这里进行消息数据处理
      handleDataProcessing();
    }
  });
}

function handleDataProcessing() {
  // 处理消息数据的逻辑
  console.log('Performing data processing for getconversations and getroommembers messages');
}