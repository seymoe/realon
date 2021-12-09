import { Application } from ".."

class Canvas2DApplication extends Application {
  protected context: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.context = this.canvas.getContext('2d')
  }

  clear() {
    if (this.context === null) return
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default Canvas2DApplication
