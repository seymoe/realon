
class Scene {
  private _id: string
  private stage: any
  private children: any[]
  constructor(id: string, stage: any) {
    this._id = id
    this.stage = stage
    this.children = []
  }

  update() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].update(this.stage.ctx.context)
    }
  }

  addChild(child: any) {
    this.children.push(child)
  }
}

export default Scene
