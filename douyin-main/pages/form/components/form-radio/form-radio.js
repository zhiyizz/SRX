import { FEFormElement, BehaviorMap, FormLifeCycleEvent } from '@clue_nidapp/form-core';
import eventBus from '../../eventBus'

Component({
  data: {
    value: "",
  },
  properties: {
    element: FEFormElement,
    label: "",
  },
  inject: ["formCore"],
  ready() {
    this.inject.formCore.on(FormLifeCycleEvent.FieldReset, this.resetData);
    eventBus.on('resetForm', this.resetData);
  },
  attached(){
    this.setDefault();
  },
  methods: {
    resetData(){
      this.setDefault();
    },
    setDefault(){
      let value = '';
      const defaultArray = this.properties.element.dataSource.filter(({isDefault})=>isDefault).map(({name}) => name);
      if(defaultArray.length > 0){
        value = defaultArray[0]
      }
      this.setData({
        value
      });
    },
    changeHandler(e){
      const { detail } = e;
      const { id: fid, type: et } = this.properties.element;
      this.setData({
        value: detail.value
      });
      let submitData = {
        fid,
        et,
        at: BehaviorMap.Event.field_change,
        value: detail.value,
      };
      this.triggerEvent('valuechange', submitData)
    }
  }
})