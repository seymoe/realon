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
      console.log(this);
      this._appId = requestAnimationFrame(this.step.bind(this));
    }
  }

  /**
   * stop 停止
   */
  public stop() {
    if (this._start) {
      console.log("appid", this._appId);
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

    console.log(`[count] timeStamp = ${timeStamp}`);
    console.log(`[count] intervalSec = ${intervalSec}`);

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

  public update(elapsedMsec: number, intervalSec: number): void {
    console.log("已经运行", elapsedMsec, "ms");
  }

  public render(): void {}
}

class Canvas2DUtil {
  context: CanvasRenderingContext2D | null;
  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d");
  }

  drawText(text: string): void {
    if (this.context !== null) {
      let c = this.context;
      c.save();

      c.textBaseline = "middle";
      c.textAlign = "center";
      // 计算cnavas中心坐标
      let centerX: number = c.canvas.width * 0.5;
      let centerY: number = c.canvas.height * 0.5;

      c.font = "normal 80px Arial";
      c.fillStyle = "#000000";
      c.strokeStyle = "red";
      c.strokeText(text, centerX, centerY);

      c.restore();
    }
  }
}

// 调用
let canvas: HTMLCanvasElement | null = document.getElementById(
  "canvas"
) as HTMLCanvasElement;

if (canvas !== null) {
  let canvas2d: Canvas2DUtil = new Canvas2DUtil(canvas);
  canvas2d.drawText("Hello World!");
}

let app: Application = new Application();
app.start();
