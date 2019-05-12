// 绘制实心点或圆
export const fillCircle = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  fillStype: string | CanvasGradient | CanvasPattern = 'red'
): void => {
  if (context !== null) {
    context.save()
    context.fillStyle = fillStype
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
    context.restore()
  }
}

// 绘制实心文字
type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end'
type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle' | 'bottom'
export const fillText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string = '#fff',
  algin: TextAlign = 'left',
  baseline: TextBaseline = 'middle',
  font: string = '14px sans-serif'
): void => {
  if (context !== null) {
    context.save()
    context.textAlign = algin
    context.textBaseline = baseline
    context.font = font
    context.fillStyle = color
    context.fillText(text, x, y)
    context.restore()
  }
}

// 绘制线段
export const strokeLine = (
  context: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number
): void => {
  if (context !== null) {
    context.beginPath()
    context.moveTo(x0, y0)
    context.lineTo(x1, y1)
    context.stroke()
  }
}

// 绘制坐标轴
export const strokeCoord = (
  context: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  width: number,
  height: number
): void => {
  if (context !== null) {
    context.save()
    // x 轴
    context.strokeStyle = 'red'
    strokeLine(context, originX, originY, originX + width, originY)
    // y 轴
    context.strokeStyle = 'blue'
    strokeLine(context, originX, originY, originX, originY + height)
    context.restore()
  }
}

// 绘制网格
export const strokeGrid = (
  context: CanvasRenderingContext2D,
  color: string,
  gutter: number = 10
): void => {
  if (context !== null) {
    context.save()
    context.strokeStyle = color
    context.lineWidth = 0.5
    // 从左向右画竖线
    for (let i: number = gutter + 0.5; i < context.canvas.width; i += gutter) {
      strokeLine(context, i, 0, i, context.canvas.height)
    }
    // 从上向下画竖线
    for (let i: number = gutter + 0.5; i < context.canvas.height; i += gutter) {
      strokeLine(context, 0, i, context.canvas.width, i)
    }
    context.restore()
  }
}