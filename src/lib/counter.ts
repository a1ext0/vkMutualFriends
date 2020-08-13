import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

class Counter {
    starts:number = 0
    max:number = 20
    i = 400

    init():void {
        setInterval(() => {
            this.starts = 0
            eventEmitter.emit('allowStart')
        }, this.i);
    }

    async start():Promise<boolean> {
        if (this.starts < this.max) {
            this.starts++
            return true
        } else {
            return new Promise((resolve, reject)=> {
                eventEmitter.on('allowStart', ()=> {
                    resolve(true)
                })
            })
        }
    }
}

export default new Counter()