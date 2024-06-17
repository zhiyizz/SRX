Component({
    externalClasses: ['i-class'],

    properties: {
        title: {
            type: String,
            value: '',
           
        },
        theme:String,
        // 标题顶部距离
        hideTop: {
            type: Boolean,
            value: false
        },
        hideBorder: {
            type: Boolean,
            value: false
        }

    }
});
