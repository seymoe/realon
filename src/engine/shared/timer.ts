export type TimerCallback = (id: number, data: any) => void

/**
 * 计时器
 * 1. Application能够同时触发多个计时器
 * 2. 每个计时器能以不同帧率重复执行任务
 * 3. 每个计时器能够以倒计时方式执行一次任务
 * 4. 尽量让内存使用和执行效率达到相对平衡
 *
 * @export
 * @class Timer
 */
export class Timer {
  // 唯一ID
  public id: number = -1
  public enabled: boolean = false
  public callback: TimerCallback
  public callbackData: any = undefined
  public countdown: number = 0
  public timeout: number = 0
  public onlyOnce: boolean = false
  constructor(callback: TimerCallback) {
    this.callback = callback
  }
}
