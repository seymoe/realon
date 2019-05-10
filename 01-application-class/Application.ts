class Canvas2DUtil {
  context: CanvasRenderingContext2D | null
  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')
  }

  drawText(text: string): void {
    if (this.context !== null) {
      let c = this.context
      c.save()

      c.textBaseline = 'middle'
      c.textAlign = 'center'
      // 计算cnavas中心坐标
      let centerX: number = c.canvas.width * 0.5
      let centerY: number = c.canvas.height * 0.5

      c.font = 'normal 80px Arial'
      c.fillStyle = '#000000'
      c.strokeStyle = 'red'
      c.strokeText(text, centerX, centerY)

      c.restore()
    }
  }
}

// 调用
let canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement

if (canvas !== null) {
  let canvas2d: Canvas2DUtil = new Canvas2DUtil(canvas)
  canvas2d.drawText('Hello World!')
}
