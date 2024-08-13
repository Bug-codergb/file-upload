/*
  请求数量最大3个 ， 而不是3个全部完成才再次请求
*/
class Task {
  constructor(options) {
    this.maxExecCount = options.maxExecCount || 2;
    this.taskQueue = options.taskQueue || [];
  }
  run() {
    if (!this.taskQueue.length) return;
    let minCount = Math.min(this.maxExecCount, this.taskQueue.length);
    for (let i = 0; i < minCount; i++) {
      let task = this.taskQueue.shift();
      this._runRask(task);
      this.maxExecCount--;
    }
  }
  _runRask(task) {
    task()
      .then((res) => {
        console.log(`任务执行1 ${res}`);
      })
      .catch((res) => {
        console.log(`任务执行处出错 ${res}`);
      })
      .finally(() => {
        console.log("一轮执行完毕");
        this.maxExecCount++;
        this.run();
      });
  }
}
let t1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("t1");
    }, 8000);
  });
let t2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("t2");
    }, 11000);
  });
let t3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("t3");
    }, 2000);
  });
let t4 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("t4");
    }, 2000);
  });
let t5 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("t5");
    }, 1000);
  });
let t6 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("t6");
    }, 1000);
  });
let t7 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("t7");
    }, 1000);
  });
let task = new Task({
  maxExecCount: 2,
  taskQueue: [t1, t2, t3, t4, t5, t6, t7],
});
task.run();
