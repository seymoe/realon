import { vec2 } from './shared/vec2'
import { Timer, TimerCallback } from './shared/timer'
import { CanvasMouseEvent, CanvasKeyBoardEvent } from './event'

// 事件分发接口
interface EventListenerObject {
  handleEvent(evt: Event): void
}

/**
 * Application 
 * 应用程序 - 引擎类
 */
export class Application implements EventListenerObject {
  protected _start: boolean = false
  protected _appId: number = -1
  protected _lastTime!: number
  protected _startTime!: number
  private _fps: number = 0
  public canvas: HTMLCanvasElement
  // 为mousemove事件提供变量开关
  public isSupportMouseMove: boolean
  // 标记是否为按下状态，为mousedrag事件提供支持
  protected _isMouseDown: boolean

  // 计时器功能
  public timers: Timer[] = []
  // Timer id 从 0 开始，负数为无效的ID
  private _timerId: number = -1

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    // canvas监听鼠标事件
    this.canvas.addEventListener('mousedown', this, false)
    this.canvas.addEventListener('mouseup', this, false)
    this.canvas.addEventListener('mousemove', this, false)

    window.addEventListener('keydown', this, false)
    window.addEventListener('keyup', this, false)
    window.addEventListener('keypress', this, false)

    // 默认不支持move
    this.isSupportMouseMove = false
    // 默认没有按下鼠标
    this._isMouseDown = false
  }

  public start(): void {
    if (!this._start) {
      this._start = true
      this._appId = -1
      this._lastTime = -1
      this._startTime = -1
      this._appId = requestAnimationFrame(this.step.bind(this))
    }
  }

  public stop() {
    if (this._start) {
      cancelAnimationFrame(this._appId)
      this._appId = -1
      this._lastTime = -1
      this._startTime = -1
      this._start = false
    }
  }

  public isRunning(): boolean {
    return this._start
  }

  public get fps(): number {
    return this._fps
  }

  /**
   * step 每帧执行的函数
   */
  protected step(timeStamp: number): void {
    if (this._startTime === -1) this._startTime = timeStamp
    if (this._lastTime === -1) this._lastTime = timeStamp
    // 计算当前时间点距离第一次调用时间点的差值
    let elapsedMsec: number = timeStamp - this._startTime
    // 计算当前时间距离上一次调用时间点的差值
    let intervalSec: number = timeStamp - this._lastTime
    // 计算fps
    if (intervalSec !== 0) {
      this._fps = 1000 / intervalSec
    }
    // 将 intervalSec 化为秒
    intervalSec /= 1000
    // 更新上一次的时间点
    this._lastTime = timeStamp

    // console.log(`[count] intervalSec = ${intervalSec}s`)

    // 处理定时器
    this._handleTimers(intervalSec)
    // 更新
    this.update(elapsedMsec, intervalSec)
    // 渲染
    this.render()
    // 递归调用
    this._appId = requestAnimationFrame(
      (elapsedMsec: number): void => {
        this.step(elapsedMsec)
      }
    )
  }

  // 分发事件
  public handleEvent(evt: Event): void {
    switch (evt.type) {
      case 'mousedown':
        this._isMouseDown = true
        this.dispatchMouseDown(this._toCanvasMouseEvent(evt))
        break
      case 'mouseup':
        this._isMouseDown = false
        this.dispatchMouseUp(this._toCanvasMouseEvent(evt))
        break
      case 'mousemove':
        // 如果支持move，则分发事件
        if (this.isSupportMouseMove) {
          this.dispatchMouseMove(this._toCanvasMouseEvent(evt))
        }
        // 如果按下一个键拖动，出发drag事件
        if (this._isMouseDown) {
          this.dispatchMouseDrag(this._toCanvasMouseEvent(evt))
        }
        break
      case 'keypress':
        this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt))
        break
      case 'keydown':
        this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt))
        break
      case 'keyUp':
        this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt))
        break
    }
  }

  // 具体事件处理方法，子类覆写
  protected dispatchMouseDown(evt: CanvasMouseEvent) { }
  protected dispatchMouseUp(evt: CanvasMouseEvent) { }
  protected dispatchMouseMove(evt: CanvasMouseEvent) { }
  protected dispatchMouseDrag(evt: CanvasMouseEvent) { }
  protected dispatchKeyPress(evt: CanvasKeyBoardEvent) { }
  protected dispatchKeyDown(evt: CanvasKeyBoardEvent) { }
  protected dispatchKeyUp(evt: CanvasKeyBoardEvent) { }

  /**
   * 将鼠标指针位置转换为基于canvas元素的偏移表示
   * 即相对于viewpoint的点变换到相对于canvas表示的点
   * 本类私有可用，鼠标事件发生时调用
   * 
   * @private
   * @memberof Application
   */
  private _viewportToCanvasCoordinate(event: MouseEvent): vec2 {
    if (this.canvas) {
      let rect: ClientRect = this.canvas.getBoundingClientRect()
      // 测试mousedown
      if (event.type === 'mousedown') {
        console.log(`boundingClientRect: ${JSON.stringify(rect)},clientX: ${event.clientX}, clientY: ${event.clientY}`)
      }
      if (event.target) {
        let borderLeftWidth: number = 0
        let borderTopWidth: number = 0
        let paddingLeft: number = 0
        let paddingTop: number = 0
        let decl: CSSStyleDeclaration = window.getComputedStyle(event.target as HTMLElement)

        // borderLeftWidth
        let strNumber: string | null = decl.borderLeftWidth
        if (strNumber !== null) {
          borderLeftWidth = parseInt(strNumber, 10)
        }
        // borderTopWidth
        strNumber = decl.borderTopWidth
        if (strNumber !== null) {
          borderTopWidth = parseInt(strNumber, 10)
        }
        // paddingLeft
        strNumber = decl.paddingLeft
        if (strNumber !== null) {
          paddingLeft = parseInt(strNumber, 10)
        }
        // paddingTop
        strNumber = decl.paddingTop
        if (strNumber !== null) {
          paddingTop = parseInt(strNumber, 10)
        }

        let x: number = event.clientX - rect.left - borderLeftWidth - paddingLeft
        let y: number = event.clientY - rect.top - borderTopWidth - paddingTop
        return vec2.create(x, y)
      }
    } else {
      throw new Error('canvas is null.')
    }
  }

  /**
   * 将DOM EVENT转换为自己定义的CanvasMouseEvent
   *
   * @private
   * @param {Event} evt
   * @returns {CanvasMouseEvent}
   * @memberof Application
   */
  private _toCanvasMouseEvent(evt: Event): CanvasMouseEvent {
    let event: MouseEvent = evt as MouseEvent
    let mousePosition: vec2 = this._viewportToCanvasCoordinate(event)
    let canvasMouseEvent: CanvasMouseEvent
      = new CanvasMouseEvent(
        mousePosition,
        event.button,
        event.altKey,
        event.ctrlKey,
        event.shiftKey
      )
    return canvasMouseEvent
  }

  /**
   * 将DOM EVENT转化为自己定义的CanvasKeyBoardEvent
   *
   * @private
   * @param {Event} evt
   * @returns {CanvasKeyBoardEvent}
   * @memberof Application
   */
  private _toCanvasKeyBoardEvent(evt: Event): CanvasKeyBoardEvent {
    let event: KeyboardEvent = evt as KeyboardEvent
    let canvasKeyBoardEvent: CanvasKeyBoardEvent
      = new CanvasKeyBoardEvent(
        event.key,
        event.keyCode,
        event.repeat,
        event.altKey,
        event.ctrlKey,
        event.shiftKey
      )
    return canvasKeyBoardEvent
  }

  // 更新，子类覆写
  protected update(elapsedMsec: number, intervalSec: number): void { }

  // 渲染，子类覆写
  protected render(): void { }

  // 定时器相关方法
  /**
   * 处理定时器函数，update函数中调用
   *
   * @private
   * @param {number} intervalSec
   * @memberof Application
   */
  private _handleTimers(intervalSec: number): void {
    if (this.timers.length <= 0) return
    // 遍历timers，查找出enabled为true的timer
    // countdown不断递减，小于等于0时执行一次callback
    for (let i = 0; i < this.timers.length; i++) {
      let timer: Timer = this.timers[i]
      if (timer.enabled === false) continue

      timer.countdown -= intervalSec
      // 非精确的实现，比如countdown为0.3s，每一次循环为0.16秒
      // 则时（0.3 - 0.32）< 0 触发callback
      if (timer.countdown <= 0) {
        timer.callback(timer.id, timer.callbackData)
        if (timer.onlyOnce === false) {
          // 不止运行一次
          timer.countdown = timer.timeout // 👍
        } else {
          timer.enabled = false
        }
      }
    }
  }

  /**
   * 增加定时器，如果有存在enabled为false的定时器
   * 则直接取出来而不是new 一个
   *
   * @param {TimerCallback} callback
   * @param {number} [timeout=1]
   * @param {boolean} [onlyOnce=false]
   * @param {*} [data=undefined]
   * @returns {number}
   * @memberof Application
   */
  public addTimer(
    callback: TimerCallback, 
    timeout: number = 1,
    onlyOnce: boolean = false,
    data: any = undefined
  ): number {
    let timer: Timer
    for (let i = 0; i < this.timers.length; i++) {
      let t = this.timers[i]
      if (t.enabled === false) {
        t.callback = callback
        t.callbackData = data
        t.timeout = timeout
        t.countdown = timeout
        t.enabled = true
        t.onlyOnce = onlyOnce
        return t.id
      }
    }
    timer = new Timer(callback)
    timer.callbackData = data
    timer.timeout = timeout
    timer.countdown = timeout
    timer.enabled = true
    timer.onlyOnce = onlyOnce
    timer.id = ++this._timerId
    this.timers.push(timer)

    return timer.id
  }
  /**
   * 移除定时器 【逻辑删除，设置enable状态】
   *
   * @param {number} id
   * @returns {boolean}
   * @memberof Application
   */
  public removeTimer(id: number): boolean {
    let found: boolean = false
    for (let i = 0; i < this.timers.length; i++) {
      if (this.timers[i]['id'] === id) {
        this.timers[i]['enabled'] = false
        found = true
        break
      }
    }
    return found
  }
}

export class Canvas2DApplication extends Application {
  protected context2D: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement, contextAttributes?: CanvasRenderingContext2DSettings) {
    super(canvas)
    this.context2D = this.canvas.getContext("2d", contextAttributes)
  }
}

export class WebGLApplication extends Application {
  protected context3D: WebGLRenderingContext | null

  constructor(canvas: HTMLCanvasElement, contextAttributes?: WebGLContextAttributes) {
    super(canvas)
    this.context3D = this.canvas.getContext("webgl", contextAttributes)

    // 检查webGL兼容性
    if (this.context3D === null) {
      this.context3D = this.canvas.getContext('experimental-webgl', contextAttributes)
      if (this.context3D === null) {
        throw Error("无法创建WebGLRenderingContext上下文对象")
      }
    }
  }
}
