const { interval } = require('rxjs');
const { takeWhile, switchMap, filter } = require('rxjs/operators');

function run() {
  interval(500).pipe(
    takeWhile(() => Clibrary.IpcSelectCltChannel(wrapper.pipeCode) !== 0), // 当 selectCode 不为 0 时继续循环
    switchMap(() => {
      const message = Clibrary.IpcClientRecvMessage(wrapper.pipeCode, Clibrary.IpcSelectCltChannel(wrapper.pipeCode));
      return message ? [message] : [];
    }),
    filter(message => message !== null)
  ).subscribe(message => {
    recieveCMsg(message);
  });
}
