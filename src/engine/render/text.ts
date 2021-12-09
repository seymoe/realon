import { fillText } from '../../utils/draw'

type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end'
type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle' | 'bottom'

interface ITextOption {
  font?: string
  color?: string
  textAlign?: TextAlign
  baseLine?: TextBaseline
  x?: number
  y?: number
}

let measureCtx: any = null

class Text {
  private _id: string
  private text: string
  private font: string
  private color: string
  private textAlign: TextAlign
  private baseline: TextBaseline
  private x: number
  private y: number
  constructor(text: string, option: ITextOption = {}) {
    this._id = '' + Date.now()
    this.text = text
    this.font = option.font || '14px sans-serif'
    this.color = option.color || '#000'
    this.textAlign = option.textAlign || 'left'
    this.baseline = option.baseLine || 'top'
    this.x = option.x || 10
    this.y = option.y || 10
  }

  getWidth() {
    if (!measureCtx) {
      measureCtx = document.createElement('canvas').getContext('2d')
    }
    if (this.font) {
      measureCtx.font = this.font
    }
    return measureCtx.measureText(this.text).width
  }

  update(context: CanvasRenderingContext2D) {
    this._draw(context)
  }

  _draw(context: CanvasRenderingContext2D) {
    fillText(context, this.text, this.x, this.y, this.color, this.textAlign, this.baseline, this.font)
  }
}

export default Text
