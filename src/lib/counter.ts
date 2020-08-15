import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

class Counter {
  starts: number = 0;
  max: number = 20;
  i = 400;
  interval: NodeJS.Timeout;

  constructor() {
    this.interval = setInterval(() => {
      this.starts = 0;
      eventEmitter.emit('allowStart');
    }, this.i);
  }
  stop(): void {
    clearInterval(this.interval);
  }

  async start(): Promise<boolean> {
    if (this.starts < this.max - 1) {
      this.starts++;
      return true;
    } else {
      return new Promise((resolve, reject) => {
        eventEmitter.once('allowStart', () => {
          resolve(true);
        });
      });
    }
  }
}

export default new Counter();
