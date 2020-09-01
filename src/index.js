import EIconPicker from './e-icon-picker';
import EIcon from './e-icon';
import './css/common.css';
import './css/eiconfont.css';
import './js/eiconfont.js';
import iconList, {eIconList, elementUI, fontAwesome} from './iconList';

export * from './utils';

const install = function (Vue, options = {
    FontAwesome: true,
    ElementUI: true,
    eIcon: true,
    eIconSymbol: true,
    addIconList: [],
    removeIconList: []
}) {
    options = Object.assign({
        FontAwesome: true,
        ElementUI: true,
        eIcon: true,
        eIconSymbol: true,
        addIconList: [],
        removeIconList: []
    }, options);

    if (options.addIconList !== undefined && options.addIconList && options.addIconList.length > 0) {
        iconList.addIcon(options.addIconList);
    }

    if (options.removeIconList !== undefined && options.removeIconList && options.removeIconList.length > 0) {
        iconList.removeIcon(options.removeIconList);
    }
    if (options.FontAwesome === true) {
        iconList.addIcon(fontAwesome);
    }

    if (options.ElementUI === true) {
        iconList.addIcon(elementUI);
    }
    if (options.eIcon === true) {
        if (options.eIconSymbol) {
            let list = eIconList.map(item => {
                return item.replace("eiconfont ", "#");
            });
            iconList.addIcon(list);
        } else {
            iconList.addIcon(eIconList);
        }
    }
    Vue.component(EIconPicker.name, EIconPicker);
    Vue.component(EIcon.name, EIcon);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export {
    EIconPicker,
    EIcon,
    iconList,
    elementUI,
    fontAwesome,
    eIconList
}
export default {
    version: '1.0.5',
    install,
    EIconPicker,
    EIcon
}

