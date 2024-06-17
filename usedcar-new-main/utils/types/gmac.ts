export type LoanCarInfo = {
  car_desc: string
  car_id: string
  guide_price: string
  has_promotion: string | boolean
  is_old_car: string | boolean
  last_update_time: string
  parent_car_desc: string
  parent_car_id: string
}

export type LoanDetail = {
  /**
   * 首付金额。
   */
  downPayment: number
  /**
   * 首付比例。
   */
  downPaymentRate?: number
  /**
   * 贷款金额。
   */
  loanAmount?: number
  /**
   * 还款期数列表。
   */
  periodList: {
    /**
     * 年化利率。
     */
    interestRate: number
    /**
     * 月供金额。
     */
    monthPay: number
    /**
     * 还款期数。
     */
    period?: number
    /**
     * 尾款金额。
     */
    finalAmount?: number
    /**
     * 尾款比例。
     */
    finalAmountRate?: number
  }[]
}

export type LoanObject = {
  /**
   * 套餐名称。
   */
  name: string
  /**
   * 贷款金额。
   */
  loanAmount?: number
  /**
   * 车辆价格。
   */
  price?: number
  /**
   * 套餐列表。
   */
  list: LoanDetail[]
  /**
   * 隐藏表单项。
   */
  hidden?: {
    loanAmount?: boolean
    downPaymentRate?: boolean
    period?: boolean
    finalAmountRate?: boolean
  }
}
