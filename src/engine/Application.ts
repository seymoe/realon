/**
 * Application 
 * 应用程序 - 引擎类
 */
export default class Application {
  protected _start: boolean = false;
  protected _appId: number = -1;
  protected _lastTime!: number;
  protected _startTime!: number;

  public start(): void {
    if (!this._start) {
      this._start = true;
      this._appId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._appId = requestAnimationFrame(this.step.bind(this));
    }
  }

  public stop() {
    if (this._start) {
      cancelAnimationFrame(this._appId);
      this._appId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._start = false;
    }
  }

  public isRunning(): boolean {
    return this._start;
  }

  /**
   * step 每帧执行的函数
   */
  protected step(timeStamp: number): void {
    if (this._startTime === -1) this._startTime = timeStamp;
    if (this._lastTime === -1) this._lastTime = timeStamp;
    // 计算当前时间点距离第一次调用时间点的差值
    let elapsedMsec: number = timeStamp - this._startTime;
    // 计算当前时间距离上一次调用时间点的差值
    let intervalSec: number = timeStamp - this._lastTime;
    // 更新上一次的时间点
    this._lastTime = timeStamp;

    // console.log(`[count] timeStamp = ${timeStamp}`);
    // console.log(`[count] intervalSec = ${intervalSec}`);

    // 更新
    this.update(elapsedMsec, intervalSec);
    // 渲染
    this.render();

    this._appId = requestAnimationFrame(
      (elapsedMsec: number): void => {
        this.step(elapsedMsec);
      }
    );
  }

  protected update(elapsedMsec: number, intervalSec: number): void {
    console.log("已经运行", elapsedMsec, "ms");
  }

  protected render(): void { }
}

