import Canvas2DApplication from "../renderer/canvasRender"
import WebGLApplication from "../renderer/webglRender"
import { strokeGrid, strokeCoord, fillCircle, fillText } from '../../utils/draw'

interface iGridOption {
  enable?: Boolean
  gutter?: Number
}

interface iStageOptions {
  grid?: iGridOption
}

class Stage {
  private canvas: HTMLCanvasElement
  private scenes: Map<string, any>
  private _scene: string
  private ctx: any

  constructor(canvas: HTMLCanvasElement, renderer: string, options: iStageOptions = {}) {
    this.canvas = canvas
    this.scenes = new Map()
    this._scene = ''
    this.ctx = renderer === 'canvas' ? new Canvas2DApplication(canvas) : new WebGLApplication(canvas);
    console.log('舞台', this)
    const funcs: any[] = []
    if (options.grid) {
      if (typeof options.grid === 'object' && options.grid.enable) {
        funcs.push(() => { strokeGrid(this.ctx.context, '#f1f1f1', 20)})
      }
    }
    this.ctx.render = () => {
      this.ctx.clear()
      funcs.forEach(func => { func && func() })
      // 渲染场景
      const currentScene = this.scenes.get(this._scene)
      if (currentScene) {
        currentScene.update()
      }
    }
    this.ctx.start()
  }

  addScene(scene: any) {
    if (!this.scenes.has(scene._id)) {
      this.scenes.set(scene._id, scene)
      if (!this._scene) this.changeScene(scene._id)
    }
  }

  removeScene(sceneId: string) {
    this.scenes.delete(sceneId)
  }

  getCurrentScene() {
    return this.scenes.get(this._scene)
  }

  changeScene(sceneId: string) {
    this._scene = sceneId
    return this.getCurrentScene()
  }
}

export default Stage