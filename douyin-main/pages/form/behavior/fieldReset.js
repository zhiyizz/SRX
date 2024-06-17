import { FormLifeCycleEvent } from '@clue_nidapp/form-core';
export default Behavior({
  inject: ["fromCore"],
  ready() {
    console.log(this.inject.formCore);
    this.inject.formCore.on(FormLifeCycleEvent.FieldReset, this.resetData);
  },
  methods: {
    resetData() {},
  },
});