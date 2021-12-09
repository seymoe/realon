 import { Application } from ".."
 
 class WebGLApplication extends Application {
  protected context: WebGLRenderingContext | null

  constructor(canvas: HTMLCanvasElement, contextAttributes?: WebGLContextAttributes) {
    super(canvas)
    this.context = this.canvas.getContext('webgl', contextAttributes)
    // 检查webGL兼容性
    if (this.context === null) {
      this.context = this.canvas.getContext('experimental-webgl', contextAttributes)
      if (this.context === null) {
        throw Error('无法创建WebGLRenderingContext上下文对象')
      }
    }
  }

  clear() {}
}

export default WebGLApplication