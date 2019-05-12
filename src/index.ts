import { Canvas2DApplication } from './engine/Application'
import { CanvasMouseEvent, CanvasKeyBoardEvent } from './engine/shared/event'
import { strokeGrid, strokeCoord, fillCircle, fillText } from './utils/draw';

class PlayGround extends Canvas2DApplication {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
  }
  protected render(): void {
    this.drawBackground()
    this.drawText('Canvas Render Engine')
  }

  protected drawText(text: string): void {
    if (this.context2D !== null) {
      let c = this.context2D
      // 计算cnavas中心坐标
      let centerX: number = c.canvas.width * 0.5
      let centerY: number = c.canvas.height * 0.5

      fillText(c, text, centerX, centerY, '#ff9bcc', 'center', 'middle', '140px sans-serif')
    }
  }

  // 画背景
  protected drawBackground(): void {
    let c = this.context2D
    if (c !== null) {
      c.clearRect(0, 0, c.canvas.width, c.canvas.height)
      fillCircle(c, 0, 0, 5, 'green')
      strokeGrid(c, '#333', 15)
      strokeCoord(c, 0, 0, c.canvas.width, c.canvas.height)
    }
  }

  // 鼠标
  protected dispatchMouseDown(evt: CanvasMouseEvent) {
    console.log('鼠标按下', evt)
  }

  // 按键
  protected dispatchKeyPress(evt: CanvasKeyBoardEvent) {
    console.log('按键', evt)
  }
}

const init = function (): void {
  // 调用
  let canvas: HTMLCanvasElement | null = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement

  let startBtn: HTMLButtonElement | null = document.getElementById('btnStart') as HTMLButtonElement
  let stopBtn: HTMLButtonElement | null = document.getElementById('btnStop') as HTMLButtonElement

  let playground: PlayGround | null

  if (canvas !== null) {
    playground = new PlayGround(canvas)
    // 测试定时器
    playground.addTimer((id, data) => {
      console.log(data)
    }, 3, false, {a: 1})

    // 直接开始运行
    playground.start()
  }

  startBtn.onclick = function (): void {
    if (playground !== null) {
      playground.start()
    }
  }
  stopBtn.onclick = function (): void {
    if (playground !== null) {
      playground.stop()
      playground.removeTimer(0)
    }
  }
}

init()