import Application from './engine/Application'

class PlayGround extends Application {
    protected context: CanvasRenderingContext2D | null

    constructor(canvas: HTMLCanvasElement) {
        super()
        this.context = canvas.getContext("2d")
    }

    protected render(): void {
        this.drawText('fps ' + this._fps)
    }

    protected drawText(text: string): void {
        if (this.context !== null) {
            let c = this.context;
            c.clearRect(0, 0, c.canvas.width, c.canvas.height)
            c.save()

            c.textBaseline = "middle"
            c.textAlign = "center"
            // 计算cnavas中心坐标
            let centerX: number = c.canvas.width * 0.5
            let centerY: number = c.canvas.height * 0.5

            c.font = "normal 100px Arial"
            c.fillStyle = "pink"
            c.strokeStyle = "yellow"
            c.fillText(text, centerX, centerY)
            c.strokeText(text, centerX, centerY)

            c.restore()
        }
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