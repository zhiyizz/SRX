import { FEFormElement, FormLifeCycleEvent, BehaviorMap, getSelectLevelOptions, getSelectFieldDefaultValue, formatSelectFieldValue } from '@clue_nidapp/form-core';
import eventBus from '../../eventBus'

Component({
  data: {
    pickerRange: [],
    selectItems: [], // 已选的每一级选项 ,单选时数据结构[[{..}],[{..}],[{..}]],多选时数据结构[[{..}],[{..}],[{},{},{}]]
    levelOptions: [],
    index:0,
    multiLevelValueMap: {},
    multiLevel: 2, // 多选层级
  },
  properties: {
    element: {
      type: FEFormElement,
      observer(newVal, oldVal) {
        this.setDefault();
        this.setLevelOptions();
      },
    },
    label: ''
  },
  inject: ["formCore"],
  ready() {
    this.inject.formCore.on(FormLifeCycleEvent.FieldReset, this.resetData);
    eventBus.on('resetForm', this.resetData);
  },
  methods: {
    resetData() {
      this.setDefault();
      this.setLevelOptions();
    },
    setLevelOptions() {
      const { properties, data } = this;
      const { element } = properties;
      const levelOptions = getSelectLevelOptions(element.dataSource, data.selectItems);
      this.setData({
        levelOptions,
        elements:element.dataSource
      });
    },
    setDefault() {
      const { multiLevel } = this.data;
      const { dataSource, expand } = this.properties.element;
      const selectItems = getSelectFieldDefaultValue(dataSource);
      // const { properties, data } = this;
      // const { element } = properties;
      // const levelOptions = getSelectLevelOptions(element.dataSource, data.selectItems);
      // let arr = [];
      //   const multiLevelValueMap = {};
      // if(levelOptions[0][0].children){
      //   arr.push([levelOptions[0][0]],[levelOptions[0][0].children[0]],[levelOptions[0][0].children[0].children[0]])
      // }else{
      //   arr.push([levelOptions[0][0]])
      // }
      // if(Array.isArray(arr[multiLevel])){
      //   arr && arr[multiLevel].forEach(item => {
      //     multiLevelValueMap[item.name] = true
      //   })
      // }
      // this.setData({
      //   selectItems:arr,
      //   multiLevelValueMap
      // })
      // this.changeValueToFormCore();

         const multiLevelValueMap = {};
         if (Array.isArray(selectItems[multiLevel]) && expand.multiple) {
           selectItems[multiLevel].forEach(item => {
             multiLevelValueMap[item.name] = true
           })
         }
         this.setData({
           selectItems,
           multiLevelValueMap
         })
    },
    changeValueToFormCore() {
      const { id: fid, type: et, expand } = this.properties.element;
      const { selectItems } = this.data;
      this.triggerEvent('valuechange', {
        fid,
        et,
        at: BehaviorMap.Event.field_change,
        value: formatSelectFieldValue(selectItems, expand.multiple),
        extra: {
          selectItems: selectItems.map(item => item.length > 1 ? item : item[0]),
        }
      })
    },
    pickerChange(e) {
      const { value } = e.detail;
      const { id: level } = e.target;
      const { levelOptions, selectItems, multiLevel } = this.data;
      selectItems.splice(level)
      selectItems[Number(level)] = [levelOptions[level][value]];
      this.setData({
        selectItems,
      });
      this.setLevelOptions();
      this.changeValueToFormCore();
    },
    checkboxChangeHandler(e) {
      const { levelOptions, selectItems, multiLevel, multiLevelValueMap } = this.data;
      const value = e.detail.value;
      multiLevelValueMap[value] = !multiLevelValueMap[value];
      selectItems[multiLevel] = levelOptions[multiLevel].filter(({ name }) => multiLevelValueMap[name] === true);

      this.setData({
        selectItems,
        multiLevelValueMap
      });
      this.changeValueToFormCore();
    }
  }
})