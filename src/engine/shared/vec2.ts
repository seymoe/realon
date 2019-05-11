export class vec2 {
  public values: Float32Array
  public constructor(x: number = 0, y: number = 0) {
    this.values = new Float32Array([x, y])
  }
  public toString(): string {
    return `[${this.values[0]},${this.values[1]}]`
  }
  public get x(): number {
    return this.values[0]
  }
  public get y(): number {
    return this.values[1]
  }
  public set x(x: number) {
    this.values[0] = x
  }
  public set y(y: number) {
    this.values[0] = y
  }

  // 静态方法
  public static create(x: number = 0, y: number = 0): vec2 {
    return new vec2(x, y)
  }
}
