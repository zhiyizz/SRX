
 import { Core as FormCore, FormLifeCycleEvent } from '@clue_nidapp/form-core';
 import getConvertSDK from '@clue_nidapp/mini-convert-sdk';
 import { API as requestPlugin } from '@clue_nidapp/plugin-api-mini';
//  import { MiniDealerData, DataSourceHandleEvents } from '@clue_nidapp/plugin-form-dealer-mini';
//  const utils = require('../../utils/utils');
 const appInstance = getApp();
 Page({
   data: {
     // 基础字段case
     formId: undefined, //表单ID
     advId: undefined, //广告主账号ID
     clueAccountId: undefined, //线索通账号ID
     formCore: null,
     elements: [],
     submitBtnText: '立即预约',
     showCaptcha: false,
     globalData:{},
      captchaOptions: {
       validateType: 'sms',
       phoneNumber: "",
       secretPhoneId: "",
       validateImgUrl: ""
     },
   },
   onLoad:  function (e) {
    const _that = this;
    // async function getP(){
    //   let id = await utils.getPhone()
    //   if(id){
    //     _that.setData({
    //       openid:id
    //     })
    //     _that.initForm();
    //   }
    // }
    // getP();
      if(e.name){
        //设置标题
        tt.setNavigationBarTitle({
          title:e.name,
        })
      }
      this.setData({
        formId:Number(e.formId),
        advId:Number(e.advId),
        clueAccountId:Number(e.clueAccountId),
        kv:e.kv,
        bg:e.bg,
        titlecolor:e.titlecolor,
        titletext:e.titletext,
        btnbgcolor:e.btnbgcolor,
        btntext:e.btntext,
        btnfontcolor:e.btnfontcolor
      })
   },
  onReady: function () {
    this.initForm();
  },
  onShow:async function() {
    // 为保证归因信息准确性，每次页面显示时，重新设置 convertSDK
    const openid = appInstance.globalData.openid;
     if (this.formCore) {
       this.formCore.setConvertSDK(getConvertSDK('tt1d716bcc824f558201','别克汽车',openid));
     }
  },
   provide() {
     return {
       formCore: this.formCore,
     };
   },
    initForm() {
     const { formId, advId, clueAccountId } = this.data;
     const openid = appInstance.globalData.openid;
     const options = {
       data: {
         formId,
         advId,
         clueAccountId,
       },
       externalSetting: {
         scenarioType: 25,
         setting: {
           showTipsOnSubmitSuccess: false,
         }
       },
       plugins: [new requestPlugin()]
     };
     const formCore = new FormCore(options,  getConvertSDK('tt1d716bcc824f558201','别克汽车',openid));
     // 表单实例初始化完成
     formCore.on(FormLifeCycleEvent.DetailReady, (innerData) => {
       this.setData({
         elements: innerData.elements,
        // submitBtnText: innerData.submitText
       });
    //  this.getPreferData();
     });
     // 表单提交前校验字段
     formCore.on(FormLifeCycleEvent.ValidateBeforeSubmitForm, (result) => {
       const { valid, errors } = result;
       console.log('===== 校验失败 errors ======', errors)
       !valid && tt.showToast({
         title: errors[0].message,
         icon: 'fail'
       })
     });
     // // 表单输入时实校验
     // formCore.on(FormLifeCycleEvent.FieldValidateResult, ({ fieldIdOrFieldType: elementId, result }) => {
     //   if (!result.valid) {
     //     tt.showToast({
     //       title: result.message,
     //       icon: 'fail'
     //     });
     //   }
     // });
     // 短信验证码校验
      formCore.on(FormLifeCycleEvent.NeedSMSVerification, (res) => {
        this.showCaptcha(res);
      });
     // 表单提交成功
     formCore.on(FormLifeCycleEvent.SubmitFormSuccess, () => {
       tt.showToast({
         title: '提交成功',
         icon: 'success'
       });
     });
     formCore.on(FormLifeCycleEvent.FieldReset, () => {
       // todo：清空表单填写信息
     });
      formCore.on(FormLifeCycleEvent.SubmitFormError, (res) => {
        tt.showToast({
          title: res.errors[0].error_message,
          icon: 'fail'
        });      
      });
     // 优选经销商返回新的下拉选项列表
      // formCore.on(DataSourceHandleEvents.DataSourceChange, (res) => {
      //   this.setData({
      //     elements: this.formCore.innerData.elements
      //   });
      // });
     this.formCore = formCore;
     this.setProvide({ formCore });
   },
   formValueChange(e) {
     const { detail: data } = e;
     let fieldData = {
       at: data.at,
       fid: data.fid,
       et: data.et,
       value: data.value,
       ts: Date.now(),
       useraction: true,
     };
     if (data.extra) {
       fieldData.extra = data.extra;
     }
     this.formCore.reportBehavior(fieldData);
   },
   submit() {
     this.formCore.submitForm(0);
   },

   submitWithCaptcha(e) {
    this.formCore.submitWithCaptcha({ sms_ticket: e.detail });
    this.setData({
      showCaptcha: false,
    });
  },

  showCaptcha(captchaOptions) {
    console.log(captchaOptions)
    this.setData({
      captchaOptions,
      showCaptcha: true
    });
  },

  closeCaptcha() {
    this.formCore.captchaVerificationFail();
    this.setData({
      showCaptcha: false,
    });
  },

 });

