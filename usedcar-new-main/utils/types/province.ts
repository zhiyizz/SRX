export type ProvinceType = {
  /**
   * 省份id
   */
  proid: string;
  /**
   * 省份名称
   */
  proname: string;
  /**
   * 省份拼音缩写
   */
  propy: string;
  citys: {
    /**
     * 城市id
     */
    cityid: string;
    /**
     * 城市名称
     */
    cityname: string;
    /**
     * 城市拼音缩写
     */
    citypy: string;
  }[];
}[];
