import { FEFormElement, FormLifeCycleEvent, BehaviorMap } from '@clue_nidapp/form-core';
import eventBus from '../../eventBus'
Component({
  data: {
    value: [],
  },

  properties: {
    element: FEFormElement,
    label: ''
  },
  inject: ["formCore"],
  ready() {
    this.inject.formCore.on(FormLifeCycleEvent.FieldReset, this.resetData);
    eventBus.on('resetForm', this.resetData);
  },
  methods: {
    resetData(){
      this.setData({
        value: []
      });
    },
    changeHandler(e) {
      const { detail } = e;
      this.setData({
        value: detail.value
      });
      const { id: fid, type: et } = this.properties.element;
      let submitData = {
        fid,
        et,
        at: BehaviorMap.Event.field_change,
        value: detail.code[2],
      };
      this.triggerEvent('valuechange', submitData)
    }
  }
})