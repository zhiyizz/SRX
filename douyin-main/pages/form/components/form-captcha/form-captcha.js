import { Core as CaptchaCore, ValidateType, CaptchaLifeCycleEvent, SmsCodeEvent } from '@clue_nidapp/captcha-core';
import { API as requestPlugin } from '@clue_nidapp/plugin-api-mini';

Component({
  data: {
    smsCountDown: 60,
  },
  properties: {
    validateType: ValidateType,
    phoneNumber: String,
    secretPhoneId: String,
    validateImgUrl: String,
  },
  ready(){
    this.initCaptcha();
  },
  methods: {
    initCaptcha() {
      const { validateType, phoneNumber, secretPhoneId, validateImgUrl} = this.properties;
      const captchaCore = new CaptchaCore({
        validateType,
        plugins: [new requestPlugin()],
      });
      captchaCore.InitCodeInfo({
        phoneNumber,
        secretPhoneId,
        validateImgUrl,
        intervalTime: 60,
        channel: 4,
      });
      captchaCore.on(CaptchaLifeCycleEvent.GetCodeFail, (res) => {
        this.setData({
          graphCaptchaTip: res.message,
        });
      });
      captchaCore.on(CaptchaLifeCycleEvent.GetCodeSuccess, () => {
        console.log('captcha: 发送成功');
      });
      captchaCore.on(CaptchaLifeCycleEvent.SubmitSuccess, (res) => {
        // 验证成功,后续res.data.smsTicket会在表单再次提交时使用
        this.triggerEvent('validatesuccess', res.data.sms_ticket);
      });
      captchaCore.on(CaptchaLifeCycleEvent.SubmitFail, message => {
        console.warn('captcha: fail', message);
      });
      captchaCore.on(CaptchaLifeCycleEvent.SubmitError, error => {
        console.warn('captcha: error', error);
      });
      captchaCore.on(SmsCodeEvent.CountDown, count => {
        this.setData({
          smsCountDown: count,
        });
      });
      this.captchaCore = captchaCore;
    },
    getCode() {
      this.captchaCore.getCode();
    },
    valueChangeHandler(e) {
      const { detail } = e;
      this.captchaCore.changeCode({ code: detail.value });
    },
    submit(){
      this.captchaCore.submit();
    },
    close() {
      this.triggerEvent('close');
    },
  }
})