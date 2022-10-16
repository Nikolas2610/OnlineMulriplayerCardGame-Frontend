import { TYPE, type PluginOptions } from "vue-toastification";

export const options: PluginOptions = {
    toastDefaults: {
        // ToastOptions object for each type of toast
        [TYPE.ERROR]: {
            timeout: 10000,
        },
        [TYPE.SUCCESS]: {
            timeout: 5000,
        },    
        [TYPE.INFO]: {
            timeout: 5000,
        },
        [TYPE.WARNING]: {
            timeout: 5000,
        }    
    }
};