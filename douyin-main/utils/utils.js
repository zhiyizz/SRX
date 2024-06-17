
function getPhone() {
  let oid = null
  return new Promise((resolve, reject) => {
    /*获取手机号码 */
    tt.getStorage({
      key: 'openid',
      complete(res) {
        //获取本地储存openid
        const openid = res.data;
        oid = openid
        if (oid) {
          tt.checkSession({
            success() {
              console.log(`session 未过期`);
              resolve(oid)
            },
            fail() {
              console.log(`session 已过期，需要重新登录`);
              tt.login({
                success: (res) => {
                  //二次登录
                  tt.request({
                    url: `https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/GetSeesionKey?code=${res.code}`,
                    method: 'GET',
                    success: (res) => {
                      console.log('login', res)
                      if (res.data.code === 1000) {
                        const id = res.data.result;
                        tt.setStorage({
                          key: "openid",
                          data: id,
                          success(res) {
                            //首次保存openid
                            //  _that.setData({
                            //    openid: openid
                            //  })
                            oid = id
                            resolve(oid)
                          },
                          fail(res) {
                            console.log(`setStorage调用失败`);
                          },
                        });
                      }

                    },
                    fail: (res) => {

                    },
                  });


                },
                fail: (err) => {
                  console.log("登录失败", err);
                },
              });
            },
          });
        } else {
          //未储存
          tt.login({
            success: (res) => {
              //首次登录
              console.log('第一次登录')
              tt.request({
                url: `https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/GetSeesionKey?code=${res.code}`,
                method: 'GET',
                success: (res) => {
                  console.log('login', res)
                  if (res.data.code === 1000) {
                    const id = res.data.result;

                    tt.setStorage({
                      key: "openid",
                      data: id,
                      success(res) {
                        //首次保存openid
                        //  _that.setData({
                        //    openid: openid
                        //  })
                        oid = id
                        resolve(oid)
                      },
                      fail(res) {
                        console.log(`setStorage调用失败`);
                      },
                    });
                  }

                },
                fail: (res) => {

                },
              });

            },
            fail: (err) => {
              console.log("登录失败", err);
            },
          });
        }
      }
    });
  })

}

module.exports = {
  getPhone: getPhone
}