import { Core as FormCore, FormLifeCycleEvent } from '@clue_nidapp/form-core';
import getConvertSDK from '@clue_nidapp/mini-convert-sdk';
import { API as requestPlugin } from '@clue_nidapp/plugin-api-mini';
import { MiniDealerData, DataSourceHandleEvents } from '@clue_nidapp/plugin-form-dealer-mini';
import eventBus from './eventBus'
Page({
  data: {
    // 基础字段case
    formId: 1742211503653918,
    advId: 3526908054,
    // 多选优选经销商case
    // formId: 1725351685355527,
    // advId: 1668645061762056,
    clueAccountId: undefined,
    formCore: null,
    elements: [],
    submitBtnText: '提交',
    showCaptcha: false,
    captchaOptions: {
      validateType: 'sms',
      phoneNumber: "18833567817",
      secretPhoneId: "",
      validateImgUrl: ""
    },
    currentTab: "base"
  },
  onReady: function () {
    this.initForm();
  },
  provide() {
    return {
      formCore: this.formCore,
    };
  },
  initForm() {
    const { formId, advId, clueAccountId } = this.data;
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
      plugins: [new requestPlugin(), new MiniDealerData()]
    };
    const formCore = new FormCore(options, getConvertSDK('miniProgramId'));
    // 表单实例初始化完成
    formCore.on(FormLifeCycleEvent.DetailReady, (innerData) => {
      this.setData({
        elements: innerData.elements,
        submitBtnText: innerData.submitText
      });
      this.getPreferData();
    });
    // 表单提交前校验字段
    formCore.on(FormLifeCycleEvent.ValidateBeforeSubmitForm, (result) => {
      const { valid, errors } = result;
      console.log('===== 校验失败 errors ======', errors)
      !valid && tt.showToast({
        title: '校验失败',
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
    formCore.on(DataSourceHandleEvents.DataSourceChange, (res) => {
      this.setData({
        elements: this.formCore.innerData.elements
      });
    });
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

  // 获取优选经销商数据
  getPreferData() {
    this.formCore.emit(DataSourceHandleEvents.getPreferData);
  },

  handleTabChange(e) {
    const currentTab = e.detail.tabKey;
    this.setData({
      currentTab: e.detail.tabKey
    })
    if (currentTab === 'dealer') {
      this.setData({
        formId: 1725351685355527,
        advId: 1668645061762056,
      });
    } else {
      this.setData({
        formId: 1742211503653918,
        advId: 3526908054,
      });
    }
    this.initForm();
    eventBus.emit('resetForm');
  }
});