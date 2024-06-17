
const app = getApp()

Page({
  data: {
    img: {
      p1: 'https://m.buick.com.cn/douyinapp/promotion1111_2/img1.jpg?' + new Date().getTime(),
      p2: 'https://m.buick.com.cn/douyinapp/promotion1111_2/img2.jpg?' + new Date().getTime(),
      button: 'https://m.buick.com.cn/douyinapp/promotion1111_2/button.jpg?' + new Date().getTime()
    }
  },
  onShareAppMessage(e) {
    return {
      path: '/pages/promotion1111/index',
      templateId:'41gei1h085n28hg5dh',
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
      url: `../promotion1111_td/index?utm_campaign=${this.data.utm_campaign}&utm_content=${this.data.utm_content}&utm_medium=${this.data.utm_medium}&utm_source=${this.data.utm_source}&utm_term=${this.data.utm_term}`,
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
        console.log(res.data);

        if(res.data.code==1000){
          _that.setData({
            phone:res.data.result.purePhoneNumber
          })

          // tt.navigateTo({
          //   url: `../century_td/index?utm_campaign=${_that.data.utm_campaign}&utm_content=${_that.data.utm_content}&utm_medium=${_that.data.utm_medium}&utm_source=${_that.data.utm_source}&utm_term=${_that.data.utm_term}&phone=${res.data.result.purePhoneNumber}`,
          //   success(res) {
          //     console.log('success执行了', res);
          //   },
          //   fail(err) {
          //     console.log('fail执行了', err);
          //   },
          //   complete(res) {
          //     console.log('complete执行了', res);
          //   }
          // });

  
        }
      },
      fail: (res) => {

      },
    });

    // tt.getLocation({
    //   withCredentials:true,
    //   success:(data) => {
    //     console.log(data)
       
        
    //    },
    // })

  },
  onLoad(e) {
    //获取openid 存储storage 判断openid false => tt.login | true => tti.checksession 新人
      let _that = this;
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
