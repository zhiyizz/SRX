export type carsType =  {
    /**
     * 年限
     */
    ModelYear: string;
    /**
     * 别克
     */
    brand: string;
    /**
     * 生产年限
     */
    certStat: string;
    /**
     * 车型颜色
     */
    color: string;
    /**
     * 排量
     */
    dspm: string;
    /**
     * 行驶里程
     */
    mileage: string;
    /**
     * 描述文案
     */
    model: string;
    /**
     * 车型图片
     */
    pic45: string;
    /**
     * 车型价格
     */
    price: string;
    /**
     * 车型
     */
    series: string;
    /**y
     * 上牌时间
     */
    signDate: string;
    /**
     * 上牌城市
     */
    vehicleCity: string;
    vhclId: string;
    /**
     * 车型分类
     */
    vhclType: string;
  };
export type CarListType = {
  /**
   * 当前页数
   */
  pagenum: string;
  /**
   * 显示个数
   */
  pagesiz4: string;
  totol: number;
  /**
   * 车型数据
   */
  cars:carsType[]
};
