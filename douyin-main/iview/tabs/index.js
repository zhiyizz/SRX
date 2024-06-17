import eventBus from '../eventBus'
Component({
    externalClasses: ['i-class'],
    attached() {
      eventBus.on('tabChange', this.emitEvent)
    },

    relations: {
        '../tab/index': {
            type: 'child',
            linked () {
                this.changeCurrent();
            },
            linkChanged () {
                this.changeCurrent();
            },
            unlinked () {
                this.changeCurrent();
            }
        }
    },

    properties: {
        current: {
            type: String,
            value: '',
            observer: 'changeCurrent'
        },
        color: {
            type: String,
            value: ''
        },
        scroll: {
            type: Boolean,
            value: false
        },
        fixed: {
            type: Boolean,
            value: false
        }
    },

    methods: {
        changeCurrent (val = this.data.current) {
            eventBus.emit('changeCurrentTab', val)
        },
        emitEvent (tabKey) {
            this.triggerEvent('change', { tabKey });
        }
    }
});
