import { BehaviorMap, Core, FEFormElement, FormLifeCycleEvent } from '@clue_nidapp/form-core';
import eventBus from '../../eventBus'
Component({
  data: {
    value: "",
  },
  properties: {
    element: FEFormElement,
    core: Core,
    label: ''
  },
  inject: ["formCore"],
  ready() {
    this.inject.formCore.on(FormLifeCycleEvent.FieldReset, this.resetData);
    eventBus.on('resetForm', this.resetData);
  },
  methods: {
    resetData() {
      this.setData({
        value: ""
      });
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