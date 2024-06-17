const app = getApp()

Page({
  data: {
    img: {
      p1: 'https://m.buick.com.cn/douyinapp/img1.jpg?' + new Date().getTime(),
      p2: 'https://m.buick.com.cn/douyinapp/img2.jpg?' + new Date().getTime(),
      p3: 'https://m.buick.com.cn/douyinapp/img3.jpg?' + new Date().getTime(),
      p4: 'https://m.buick.com.cn/douyinapp/img4.jpg?' + new Date().getTime(),
      p5: 'https://m.buick.com.cn/douyinapp/img5.jpg?' + new Date().getTime(),
      p6: 'https://m.buick.com.cn/douyinapp/img6.jpg?' + new Date().getTime(),
      p7: 'https://m.buick.com.cn/douyinapp/img7.jpg?' + new Date().getTime(),
      p8: 'https://m.buick.com.cn/douyinapp/img8.jpg?' + new Date().getTime(),
      p9: 'https://m.buick.com.cn/douyinapp/img9.jpg?' + new Date().getTime(),
      p10: 'https://m.buick.com.cn/douyinapp/img10.jpg?' + new Date().getTime(),
      button: 'https://m.buick.com.cn/douyinapp/button.jpg?' + new Date().getTime()
    }
  },
  onShareAppMessage() {
    return {
      path: '/pages/index/index',
      templateId:'8pl2glmahaeiae4icg',
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
      url: `../testdrive/testdrive?utm_campaign=${this.data.utm_campaign}&utm_content=${this.data.utm_content}&utm_medium=${this.data.utm_medium}&utm_source=${this.data.utm_source}&utm_term=${this.data.utm_term}`,
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
  getPhoneNumberHandler(e) {
    console.log(e);
    console.log(e)
    const _that = this;

    tt.request({
      url: `https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/DecryptUserMobile`,
      method:"POST",
      data:{
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        openid: _that.openid
      },
      success: (res) => {
        if(res.code==1000){
          _that.setData({
            phone:res.data.result.purePhoneNumber
          })
          console.log(_this.data.phone)
        }
      },
      fail: (res) => {

      },
    });

    tt.getLocation({
      withCredentials:true,
      success:(data) => {
        console.log(1111)
       
        
       },
    })

  },
  onLoad(e) {
    //获取openid 存储storage 判断openid false => tt.login | true => tti.checksession 新人
      // let _that = this;
      // tt.getStorage({
      //   key: 'openid', complete(res) {
      //     //获取本地储存openid
      //     const openid = res.data;
      //    //  _that.setData({
      //    //    openid: openid
      //    //  })
      //    _that.openid = openid;
      //     if (openid) {

      //       tt.checkSession({
      //         success() {
      //           console.log(`session 未过期`);
      //         },
      //         fail() {
      //           console.log(`session 已过期，需要重新登录`);
      //           tt.login({
      //             success: (res) => {
      //               //二次登录
      //               tt.request({
      //                 url: `https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/GetSeesionKey?code=${res.code}`,
      //                 method: 'GET',
      //                 success: (res) => {
      //                   console.log('login', res)
      //                   if (res.data.code === 1000) {
      //                     const id = res.data.result;
      //                     tt.setStorage({
      //                       key: "openid",
      //                       data: id,
      //                       success(res) {
      //                         //首次保存openid
      //                        //  _that.setData({
      //                        //    openid: openid
      //                        //  })
      //                        _that.openid = id
      //                       },
      //                       fail(res) {
      //                         console.log(`setStorage调用失败`);
      //                       },
      //                     });
      //                   }

      //                 },
      //                 fail: (res) => {

      //                 },
      //               });


      //             },
      //             fail: (err) => {
      //               console.log("登录失败", err);
      //             },
      //           });
      //         },
      //       });
    

      //     } else {

      //        //未储存
      //        tt.login({
      //         success: (res) => {
      //           //首次登录
      //           console.log(res)
      //           tt.request({
      //             url: `https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/GetSeesionKey?code=${res.code}`,
      //             method: 'GET',
      //             success: (res) => {
      //               console.log('login', res)
      //               if (res.data.code === 1000) {
      //                 const id = res.data.result;
      //                 tt.setStorage({
      //                   key: "openid",
      //                   data: id,
      //                   success(res) {
      //                     //首次保存openid
      //                    //  _that.setData({
      //                    //    openid: openid
      //                    //  })
      //                    _that.openid = id
      //                   },
      //                   fail(res) {
      //                     console.log(`setStorage调用失败`);
      //                   },
      //                 });
      //               }

      //             },
      //             fail: (res) => {

      //             },
      //           });
      //         },
      //         fail: (err) => {
      //           console.log("登录失败", err);
      //         },
      //       });

      //     }
      //   }
      // });




      // tt.checkSession({
      //   success() {
      //     console.log(`session 未过期`);
      //   },
      //   fail() {
      //     console.log(`session 已过期，需要重新登录`);

      //   },
      // });
    this.setData({
      utm_campaign: e.utm_campaign,
      utm_content: e.utm_content,
      utm_medium: e.utm_medium,
      utm_source: e.utm_source,
      utm_term: e.utm_term
    })
  }

})
