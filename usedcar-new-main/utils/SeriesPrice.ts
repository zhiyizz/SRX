/**
 * 表示车型价格的接口。
 */
export interface ISeriesPrice {
  /**
   * 起始价。
   */
  min: number
  /**
   * 最高价。
   */
  max?: number
  /**
   * 价格标签。
   */
  label?: string
  /**
   * 是否为起始价。
   */
  start?: boolean
  /**
   * 是否显示价格。
   */
  display?: boolean
}

/**
 * 储存车型价格对象的类。
 */
export default class SeriesPrice implements ISeriesPrice {
  /**
   * 起始价。
   */
  min: number
  /**
   * 最高价。（默认：`Number.MAX_VALUE`）
   */
  max = Number.MAX_SAFE_INTEGER
  /**
   * 价格标签。（默认：`官方指导价`）
   */
  label = '官方指导价'

  private _start?: boolean
  /**
   * 是否显示价格。（默认：`true`）
   */
  display = true

  // constructor(min: number, label = '官方指导价', start?: boolean) {
  //   this.min = min
  //   this.label = label
  //   this._start = start
  // }

  constructor(data: ISeriesPrice) {
    this.min = data.min
    if (data.max) {
      this.max = data.max
    }
    if (data.label) {
      this.label = data.label
    }
    if (data.display !== undefined) {
      this.display = data.display
    }
    this._start = data.start
  }

  /**
   * 是否为起始价。（默认：`min < max`）
   */
  get start(): boolean {
    if (this._start === undefined) {
      return this.min < this.max
    }
    return this._start
  }

  toString(): string {
    return JSON.stringify(this)
  }

  parseJSON(): ISeriesPrice {
    return JSON.parse(this.toString())
  }
}
