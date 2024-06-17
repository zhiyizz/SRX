import { BehaviorMap, FormLifeCycleEvent, FEFormElement } from '@clue_nidapp/form-core';
import eventBus from '../../eventBus'
const appInstance = getApp();
Component({
  data: {
    value: '',
  },

  properties: {
    element: FEFormElement,
    label: '',
  //  openid:String
  },
  inject: ["formCore"],
  ready() {
    this.inject.formCore.on(FormLifeCycleEvent.FieldReset, this.resetData);
    eventBus.on('resetForm', this.resetData);
  },
  lifetimes: {
    attached: function () {
      // this.getSessionKey().then(sessionKey => {
      //   this.sessionKey = sessionKey;
      // });
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  methods: {
    resetData() {
      this.setData({
        value: ''
      });
    },
    getPhoneNumber(e) {
      const _that = this;
      const openid = appInstance.globalData.openid;
      console.log('data', {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        openid: openid
      })
      if(e.detail.encryptedData && e.detail.iv){
        tt.showLoading({
          title: '获取授权中...',
          icon: 'loading'
        })
        tt.request({
          url: `https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/DecryptUserMobile`,
          method: "POST",
          data: {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            openid: openid
          },
          success: (res) => {
            console.log('res', res)
            if (res.data.code == 1000) {
              tt.hideLoading();
              _that.setData({
                value: res.data.result.purePhoneNumber
              })
              _that.reportBehavior(res.data.result.purePhoneNumber, BehaviorMap.Event.field_focus);
              _that.reportBehavior(res.data.result.purePhoneNumber, BehaviorMap.Event.field_change);
              _that.reportBehavior(res.data.result.purePhoneNumber, BehaviorMap.Event.field_blur);
            }
            console.log(res.data.code)
            if(res.data.code == 3000){
              tt.hideLoading();
              tt.showToast({
                title: '参数错误！',
                icon: 'fail'
              })
            }
          },
          fail: (res) => {
            
          },
        });
  
      }

    },
    reportBehavior(value, actionType) {
      const { id: fid, type: et } = this.properties.element;
      let submitData = {
        fid,
        et,
        at: actionType,
        value,
      };
      this.triggerEvent('valuechange', submitData)
    },
    fcousHandler(e) {
      this.reportBehavior(e.detail.value, BehaviorMap.Event.field_focus);
    },
    changeHandler(e) {
      this.setData({
        value: e.detail.value
      });
      this.reportBehavior(e.detail.value, BehaviorMap.Event.field_change);
    },
    blurHandler(e) {
      this.reportBehavior(e.detail.value, BehaviorMap.Event.field_blur);
    },
  }
})