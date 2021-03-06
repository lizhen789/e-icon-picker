import Vue from 'vue'
import App from './App.vue'

import "e-icon-picker/lib/symbol.js"; //基本彩色图标库
import 'e-icon-picker/lib/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; //element-ui 图标库
import iconfont from "./css/iconfont.json"; //自己的图标信息
import "./css/iconfont.css"; //自己的图标样式
import eIconPicker, {analyzingIconForIconfont, iconList, version} from 'e-icon-picker';
import svgIcons from 'e-icon-picker/lib/getSvg';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

let forIconfont = analyzingIconForIconfont(iconfont);
//全局删除增加图标
Vue.use(eIconPicker, {
    FontAwesome: true,
    ElementUI: true,
    eIcon: true,//自带的图标，来自阿里妈妈
    eIconSymbol: true,//是否开启彩色图标
    addIconList: forIconfont.list,
    removeIconList: [],
    zIndex: 3100
});

console.log(
        `%c e-icon-picker %c v${version} %c`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
      )
iconList.addIcon(svgIcons);
iconList.addIcon("http://www.icosky.com/images/wj/baidu.gif");
iconList.removeIcon(["el-icon-s-ticket"]);

Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
    components: {},
    render: h => h(App),
}).$mount('#app');
