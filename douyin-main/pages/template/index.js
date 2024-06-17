
const app = getApp();
Page({
  data: {
    infoData: {},
    btnImg: null,
    video:'./c9389463-1544-47b0-ae2d-8129739ec8c4_1_1.mp4'
  },
  onShareAppMessage(e) {
   
    //分享
    const _that = this;
    return {
      path: `/pages/template/index?key=${_that.data.keyId}`,
      templateId: _that.data.infoData.shareId,
      success(e) {
        console.log(e)
        console.log('分享成功');
      },
      fail() {
        console.log('转发发布器调起失败');
      }
    }

  },
  onClick(e) {

    const data = this.data.infoData;
    if(data.formId){
      tt.navigateTo({
        url: `../template_submit/index?formId=${data.formId}&advId=${data.advId}&clueAccountId=${data.clueAccountId}&name=${data.name}&kv=${data.testdrive.kv}&bg=${data.testdrive.bg}&titlecolor=${data.testdrive.title.color}&titletext=${data.testdrive.title.text}&btnbgcolor=${data.testdrive.submit.background_color}&btntext=${data.testdrive.submit.text}&btnfontcolor=${data.testdrive.submit.font_color}`,
        success(res) {
          // console.log('success执行了', res);
        },
        fail(err) {
          // console.log('fail执行了', err);
        },
        complete(res) {
          //  console.log('complete执行了', res);
        }
      });
    }

  },
  getInfoData: function (key) {
    let _that = this;
    const info = tt.getEnvInfoSync();
    const url = info.microapp.envType === 'production' ? `https://static.buick.com.cn/miniapp/manage/${key}.json` : `https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/GetMiniAppConfigData?key=${key}`;
    return new Promise((resolve, reject) => {
      tt.request({
        url: url,
        success: (res) => {
          console.log(res.data)
          if (typeof res.data === 'string') {
            tt.showToast({
              title: '未找到匹配数据',
              icon: 'fail'
            })
            tt.redirectTo({
              url: `../404/index?err=${res.data}`,
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
          } else {
            _that.setData({
              infoData: res.data
            })
            
          }
          resolve();
        },
        fail: (res) => {
          reject(res.data);
        },
      });
    })
  },
  pause:function(e){
     const query = tt.createSelectorQuery()
     query.selectAll(".video-play").boundingClientRect();
     query.exec(function (res){
      res[0].forEach(element => {
        var videoContextPrev = tt.createVideoContext(element.id)
        if(e && e.currentTarget.id === element.id){
          const videoContextCur = tt.createVideoContext(e.currentTarget.id)
          videoContextCur.play()
        }else{
          videoContextPrev.pause();
        }

      })

    })
    
    
},
  bindchange:function(){
    this.pause()
  },
  onLoad: function (e) {
    const key = e.key;
    const _that = this;
    _that.setData({
      keyId: e.key
    })
    _that.getInfoData(key).then((res) => {
      if (_that.data.infoData.name) {
        tt.setNavigationBarTitle({
          title: _that.data.infoData.name,
        })
      }
    })
  }
})