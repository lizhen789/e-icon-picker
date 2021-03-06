import EIconPicker from './eIconPicker';
import EIcon from './eIcon';
import './css/common.css';
import './css/eiconfont.css';

// import 'element-ui/lib/theme-chalk/input.css';
// import 'element-ui/lib/theme-chalk/popover.css';
// import 'element-ui/lib/theme-chalk/scrollbar.css';
// import 'element-ui/lib/theme-chalk/select-dropdown.css'
//
// import ElInput from 'element-ui/lib/input';
// import ElPopover from 'element-ui/lib/popover';
// import ElScrollbar from 'element-ui/lib/scrollbar';
import {version} from "../package.json";
import iconList, {eIconList, elementUI, fontAwesome} from './iconList';
import {analyzingIconForIconfont, eIconSymbol} from "./utils";

const install = function (Vue, options = {}) {
    options = {
        addIconList: options.addIconList || [],
        removeIconList: options.removeIconList || [],
        FontAwesome: options.FontAwesome || false,
        ElementUI: options.ElementUI || false,
        eIcon: options.eIcon || false,
        eIconSymbol: options.eIconSymbol || false,
        zIndex: options.zIndex || 3000,
    };

    if (options.addIconList !== undefined && options.addIconList && options.addIconList.length > 0) {
        iconList.addIcon(options.addIconList);
    }

    if (options.removeIconList !== undefined && options.removeIconList && options.removeIconList.length > 0) {
        iconList.removeIcon(options.removeIconList);
    }
    if (options.FontAwesome !== false) {
        iconList.addIcon(fontAwesome);
    }

    if (options.ElementUI !== false) {
        iconList.addIcon(elementUI);
    }
    if (options.eIcon !== false) {
        if (options.eIconSymbol) {
            let list = eIconList.map(item => {
                return item.replace("eiconfont ", "#");
            });
            iconList.addIcon(list);
        } else {
            iconList.addIcon(eIconList);
        }
    }

    // Vue.use(ElInput);
    // Vue.use(ElPopover);
    // Vue.use(ElScrollbar);
    Vue.use(EIconPicker);
    Vue.use(EIcon);
    Vue.prototype.$EICON = {
        zIndex: options.zIndex
    };
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: version,
    install,
    EIconPicker,
    EIcon,
    iconList,
    elementUI,
    fontAwesome,
    eIconList,
    analyzingIconForIconfont,
    eIconSymbol
}

