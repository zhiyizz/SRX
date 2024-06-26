Component({
    externalClasses: ['i-class'],
    relations: {
        '../checkbox/index': {
            type: 'child',
            linked() {
                this.changeCurrent();
            },
            linkChanged() {
                this.changeCurrent();
            },
            unlinked() {
                this.changeCurrent();
            }
        }
    },
    properties: {
        current: {
            type: Array,
            value: [],
            observer: 'changeCurrent'
        },
    },
    methods: {
        getRelationNodes2(path) {
            return new Promise((resolve) => {
              this.getRelationNodes(path, res => resolve(res))
            })
        },
        async changeCurrent(val = this.data.current) {
            // this.getRelationNodes('../checkbox/index', items => {
            //     const len = items.length;
            //     if (len > 0) {
            //         items.forEach(item => {
            //             item.changeCurrent(val.indexOf(item.data.value) !== -1);
            //         });
            //     }
            // })
            // let items = await this.getRelationNodes2('../checkbox/index');
            // const len = items.length;
            // if (len > 0) {
            //     items.forEach(item => {
            //         item.changeCurrent(val.indexOf(item.data.value) !== -1);
            //     });
            // }
        },
        emitEvent(current) {
            this.triggerEvent('change', current);
        }
    }
});
