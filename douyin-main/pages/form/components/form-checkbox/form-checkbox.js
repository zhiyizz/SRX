import { FEFormElement, BehaviorMap, FormLifeCycleEvent } from '@clue_nidapp/form-core';
import eventBus from '../../eventBus'
Component({
  data: {
    checkedValueMap: {},
    current: []
  },
  properties: {
    element: FEFormElement,
    label: '',
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
      this.setDefault()
    },
    setCheckedValue(defaultArray){
      const checkedValueMap = {};
      defaultArray.forEach(item => {
        checkedValueMap[item] = true;
      })
      this.setData({
        checkedValueMap,
        current: defaultArray,
      })
    },
    setDefault(){
      const defaultArray = this.properties.element.dataSource.filter(({isDefault})=>isDefault).map(({name}) => name);
      this.setCheckedValue(defaultArray);
    },
    changeHandler(e) {
      const { detail } = e;
      const { id: fid, type: et } = this.properties.element;
      const checkedValueMap = this.data.checkedValueMap;
      checkedValueMap[detail.value] = detail.current;
      const index = this.data.current.indexOf(detail.value);
      index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
      this.setData({
        checkedValueMap,
        current: this.data.current
      })
      this.triggerEvent('valuechange', {
        fid,
        et,
        at: BehaviorMap.Event.field_change,
        value: this.data.current,
      })
    }
  }
})