import eventBus from '../eventBus'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../tabs/index': {
            type: 'parent'
        }
    },

    properties: {
        tabKey: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        dot: {
            type: Boolean,
            value: false
        },
        count: {
            type: Number,
            value: 0
        }
    },

    data: {
        current: false,
        currentColor: '',
        scroll: false
    },
    attached() {
      eventBus.on('changeCurrentTab', this.changeCurrent);
    },
    methods: {
        changeCurrent (currentVal) {
            const isActive = this.data.tabKey === currentVal;
            this.setData({ current: isActive });
        },
        changeCurrentColor (currentColor) {
            this.setData({ currentColor });
        },
        changeScroll (scroll) {
            this.setData({ scroll });
        },
        handleClickItem () {
            eventBus.emit('tabChange', this.data.tabKey);
        }
    }
});
