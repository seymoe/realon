class Application {
  protected _start: boolean = false;
  protected _appId: number = -1;
  protected _lastTime!: number;
  protected _startTime!: number;

  /**
   * start 开始
   */
  public start(): void {
    if (!this._start) {
      this._start = true;
      this._appId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._appId = requestAnimationFrame(this.step.bind(this));
    }
  }

  /**
   * stop 停止
   */
  public stop() {
    if (this._start) {
      cancelAnimationFrame(this._appId);
      this._appId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._start = false;
    }
  }

  /**
   * isRunning
   */
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

class PlayGround extends Application {
  protected context: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    super()
    this.context = canvas.getContext("2d");
  }

  protected render(): void {
    this.drawText('' + this._appId)
  }

  protected drawText(text: string): void {
    if (this.context !== null) {
      let c = this.context;
      c.clearRect(0, 0, c.canvas.width, c.canvas.height)
      c.save();

      c.textBaseline = "middle";
      c.textAlign = "center";
      // 计算cnavas中心坐标
      let centerX: number = c.canvas.width * 0.5;
      let centerY: number = c.canvas.height * 0.5;

      c.font = "normal 100px Arial";
      c.fillStyle = "pink";
      c.strokeStyle = "yellow";
      c.fillText(text, centerX, centerY);
      c.strokeText(text, centerX, centerY);

      c.restore();
    }
  }
}

const init = function (): void {
  // 调用
  let canvas: HTMLCanvasElement | null = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;

  let startBtn: HTMLButtonElement | null = document.getElementById('btnStart') as HTMLButtonElement
  let stopBtn: HTMLButtonElement | null = document.getElementById('btnStop') as HTMLButtonElement

  let playground: PlayGround | null

  if (canvas !== null) {
    playground = new PlayGround(canvas);
  }

  startBtn.onclick = function (): void {
    if (playground !== null) {
      playground.start()
    }
  }
  stopBtn.onclick = function (): void {
    if (playground !== null) {
      playground.stop()
    }
  }
}

init()
