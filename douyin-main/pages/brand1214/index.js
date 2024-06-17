// /Users/zhangfutian/Documents/topsrx/抖音/小程序/douyin/pages/brand1214/index.js
Page({
  data: {
    img: {
      p1: 'https://m.buick.com.cn/douyinapp/brand1214/img1.jpg?' + new Date().getTime(),
      p2: 'https://m.buick.com.cn/douyinapp/brand1214/img2.jpg?' + new Date().getTime(),
      p2_1: 'https://m.buick.com.cn/douyinapp/brand1214/img2_1.png?' + new Date().getTime(),
      p2_2: 'https://m.buick.com.cn/douyinapp/brand1214/img2_2.png?' + new Date().getTime(),
      p2_3: 'https://m.buick.com.cn/douyinapp/brand1214/img2_3.png?' + new Date().getTime(),
      p3: 'https://m.buick.com.cn/douyinapp/brand1214/img3.jpg?' + new Date().getTime(),
      p4: 'https://m.buick.com.cn/douyinapp/brand1214/img4.jpg?' + new Date().getTime(),
      p4_1: 'https://m.buick.com.cn/douyinapp/brand1214/img4_1.png?' + new Date().getTime(),
      p4_2: 'https://m.buick.com.cn/douyinapp/brand1214/img4_2.png?' + new Date().getTime(),
      p4_3: 'https://m.buick.com.cn/douyinapp/brand1214/img4_3.png?' + new Date().getTime(),
      p5: 'https://m.buick.com.cn/douyinapp/brand1214/img5.jpg?' + new Date().getTime(),
      p6: 'https://m.buick.com.cn/douyinapp/brand1214/img6.jpg?' + new Date().getTime(),
      p6_1: 'https://m.buick.com.cn/douyinapp/brand1214/img6_1.png?' + new Date().getTime(),
      p6_2: 'https://m.buick.com.cn/douyinapp/brand1214/img6_2.png?' + new Date().getTime(),
      p7: 'https://m.buick.com.cn/douyinapp/brand1214/img7.jpg?' + new Date().getTime(),
      p8: 'https://m.buick.com.cn/douyinapp/brand1214/img8.jpg?' + new Date().getTime(),
      p8_1: 'https://m.buick.com.cn/douyinapp/brand1214/img8_1.png?' + new Date().getTime(),
      p8_2: 'https://m.buick.com.cn/douyinapp/brand1214/img8_2.png?' + new Date().getTime(),
      p8_3: 'https://m.buick.com.cn/douyinapp/brand1214/img8_3.png?' + new Date().getTime(),
      p9: 'https://m.buick.com.cn/douyinapp/brand1214/img9.jpg?' + new Date().getTime(),
      button: 'https://m.buick.com.cn/douyinapp/brand1214/button.jpg?' + new Date().getTime()
    },
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    swiper1_dot:0,
    swiper2_dot:0,
    swiper3_dot:0,
    swiper4_dot:0,
  },
  changeIndicatorDots(e) {
    if(e.target.id==='swiper1'){
      this.setData({
        swiper1_dot:e.detail.current
      })
    }
    if(e.target.id==='swiper2'){
      this.setData({
        swiper2_dot:e.detail.current
      })
    }
    if(e.target.id==='swiper3'){
      this.setData({
        swiper3_dot:e.detail.current
      })
    }
    if(e.target.id==='swiper4'){
      this.setData({
        swiper4_dot:e.detail.current
      })
    }
   
  },
  onShareAppMessage(e) {
    return {
      path: '/pages/brand1214/index',
      templateId:'2ja8lbfk16l51df5c7',
      success () {
        console.log('分享成功');
      },
      fail () {
        console.log('转发发布器调起失败');
      }
    }
  },

  onClick(e) {
    tt.navigateTo({
      url: `../brand1214_td/index?utm_campaign=${this.data.utm_campaign}&utm_content=${this.data.utm_content}&utm_medium=${this.data.utm_medium}&utm_source=${this.data.utm_source}&utm_term=${this.data.utm_term}`,
      success(res) {
        console.log('success执行了', res);
      },
      fail(err) {
        console.log('fail执行了', err);
      },
      complete(res) {
        console.log('complete执行了', res);
      }
    });
  },
  onLoad: function (e) {
    this.setData({
      utm_campaign: e.utm_campaign,
      utm_content: e.utm_content,
      utm_medium: e.utm_medium,
      utm_source: e.utm_source,
      utm_term: e.utm_term
    })
  }
})