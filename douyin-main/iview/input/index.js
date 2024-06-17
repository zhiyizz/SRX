Component({
    behaviors: ['wx://form-field'],

    externalClasses: ['i-class'],

    properties: {
        title: {
            type: String
        },
        // text || textarea || password || number
        type: {
            type: String,
            value: 'text'
        },
        disabled: {
            type: Boolean,
            value: false
        },
        placeholder: {
            type: String,
            value: ''
        },
        autofocus: {
            type: Boolean,
            value: false
        },
        mode: {
            type: String,
            value: 'normal'
        },
        right: {
            type: Boolean,
            value: false
        },
        error: {
            type: Boolean,
            value: false
        },
        maxlength: {
            type: Number
        },
        value: {
            type: String | Number,
        }
    },

    methods: {
        handleInputChange(event) {
            const { detail = {} } = event;
            const { value = '' } = detail;
            this.setData({ value });
            this.triggerEvent('change', event.detail);
        },

        handleInputFocus(event) {
            this.triggerEvent('focus', event.detail);
        },

        handleInputBlur(event) {
            this.triggerEvent('blur', event.detail);
        }
    }
});
