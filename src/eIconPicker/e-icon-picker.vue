<template>
  <div class="ui-fas">
    <!-- 弹出框 -->
    <el-popover
        :disabled="disabled"
        ref="popover"
        :placement="myPlacement"
        popper-class="el-icon-popper"
        :width="popoverWidth"
        v-model="visible"
        show-arrow
        trigger="manual"
    >
      <template slot="reference">
        <slot name="default" v-bind:data="{prefixIcon,visible,placeholder,disabled,clearable,readonly,size}">
          <el-input
              v-model="name"
              :placeholder="placeholder"
              ref="input"
              :style="styles"
              :clearable="clearable"
              :disabled="disabled"
              :readonly="readonly"
              :size="size"
              @input="_change"
              @clear="_initIcon(false)"
              @focus="_popoverShowFun(false)"
          >
            <template slot="prepend">
              <slot name="prepend" v-bind:icon="prefixIcon">
                <e-icon :icon-name="prefixIcon" class="e-icon" />
              </slot>
            </template>
          </el-input>
        </slot>
      </template>
      <el-scrollbar
          ref="eScrollbar"
          tag="div"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          :class="'is-empty-'+id"
          v-if="!destroy"
      >
        <ul
            class="fas-icon-list"
            ref="fasIconList"
            v-if="dataList && dataList.length > 0"
        >
          <li
              v-for="(item, index) in dataList"
              :key="index"
              @click="_selectedIcon(item)"
              :style="name === item && highLightColor !== '' ? {color: highLightColor} : ''"
          >
            <slot name="icon" v-bind:icon="item">
              <e-icon :icon-name="item" :title="item" class="e-icon" />
            </slot>
          </li>
        </ul>
        <span v-else class="fas-no-data" v-text="emptyText"></span>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script>
import iconList, {eIconList, elementUI, fontAwesome} from "../iconList";
import {off, on} from "../utils";
import EIcon from "../eIcon/e-icon";
import ElInput from 'element-ui/lib/input';
import ElPopover from 'element-ui/lib/popover';
import ElScrollbar from 'element-ui/lib/scrollbar';
import {PopupManager} from "element-ui/lib/utils/popup";

export default {
  name: "eIconPicker",
  components: {
    EIcon,
    ElInput,
    ElPopover,
    ElScrollbar
  },
  props: {
    // 是否禁用文本框
    disabled: {
      type: Boolean,
      // false
      default() {
        return false;
      },
    },
    readonly: {
      type: Boolean,
      // false
      default() {
        return false;
      },
    },
    clearable: {
      type: Boolean,
      // true
      default() {
        return true;
      },
    },
    // e-icon-picker 样式
    styles: {
      type: Object,
      default() {
        return {};
      },
    },
    // 弹出框位置
    placement: {
      type: String,
      //  bottom
      default() {
        return "bottom";
      },
    },
    value: {
      type: String,
      default() {
        return "";
      },
    },
    options: {},
    width: {
      type: Number,
      default() {
        return -1;
      },
    },
    size: {
      type: String,
      default() {
        return "medium";
      },
    },
    placeholder: {
      type: String,
      default() {
        return "请选择图标";
      },
    },
    defaultIcon: {
      type: String,
      default() {
        return "eiconfont e-icon-bi";
      },
    },
    emptyText: {
      type: String,
      default() {
        return "暂无可选图标";
      },
    },
    highLightColor: {
      type: String,
      default() {
        return "";
      },
    },
    zIndex: {
      type: Number,
      default() {
        return null;
      },
    }
  },
  data() {
    return {
      iconList: [],
      visible: false, // popover v-model
      prefixIcon: "eiconfont e-icon-bi",
      name: "",
      icon: {},
      myPlacement: "bottom",
      popoverWidth: 200,
      destroy: false,
      id: new Date().getTime()
    };
  },
  methods: {
    _change(val) {
      this.iconList = this.icon.list.filter(function (i) {
        return i.indexOf(val) !== -1;
      });
    },
    _initIcon(type) {
      this.prefixIcon = this.value && type && true === type ? this.value : this.defaultIcon;
      this.name = type === true ? this.value : "";
      this.icon = Object.assign({}, iconList); //复制一个全局对象，避免全局对象污染
      if (this.options) {
        this.icon.list = []; //重新给图标集合复制为空
        if (this.options.addIconList !== undefined &&
            this.options.addIconList &&
            this.options.addIconList.length > 0) {
          this.icon.addIcon(this.options.addIconList);
        }
        if (this.options.removeIconList !== undefined &&
            this.options.removeIconList &&
            this.options.removeIconList.length > 0) {
          this.icon.removeIcon(this.options.removeIconList);
        }
        if (this.options.FontAwesome === true) {
          this.icon.addIcon(fontAwesome);
        }
        if (this.options.ElementUI === true) {
          this.icon.addIcon(elementUI);
        }
        if (this.options.eIcon === true) {
          if (this.options.eIconSymbol) {
            let list = eIconList.map((item) => {
              return item.replace("eiconfont ", "#");
            });
            this.icon.addIcon(list);
          } else {
            this.icon.addIcon(eIconList);
          }
        }
      }
      this.iconList = this.icon.list;

      if (this.placement && (this.placement === "bottom" || this.placement === "top")) {
        this.myPlacement = this.placement;
      }
      if (type === false) {
        this._emitFun("");
      }
    },

    addIcon(item = []) {
      //组件内增加图标
      if (item !== undefined && item && item.length > 0) {
        this.icon.addIcon(item);
        this.iconList = this.icon.list;
      }
    },
    removeIcon(item = []) {
      //组件内删除图标
      if (item !== undefined && item && item.length > 0) {
        this.icon.removeIcon(item);
        this.iconList = this.icon.list;
      }
    },
    updatePopper(zIndex) {
      if (zIndex) {
        PopupManager.zIndex = zIndex
      }
      this._popoverShowFun(true);
      setTimeout(() => {
        this.$refs.popover.updatePopper();
      }, 100);
    },
    _selectedIcon(item) {
      this.visible = false;
      this.name = item;
      this.prefixIcon = this.name;
      this._emitFun(this.name);
    },
    // 更新宽度
    _updateW() {
      this.$nextTick(() => {
        if (this.width === -1 && this.$refs.input && this.$refs.input.$el) {
          this.popoverWidth = this.$refs.input.$el.getBoundingClientRect().width - 36;
        } else {
          this.popoverWidth = this.width;
        }
        if (this.$refs.eScrollbar && this.$refs.eScrollbar.wrap) {
          this.$refs.eScrollbar.wrap.scrollTop = 0;
          this.$refs.eScrollbar.handleScroll();
          this.$refs.eScrollbar.update();
        }
      });
    },
    // 显示弹出框的时候容错，查看是否和el宽度一致
    _popoverShowFun(flag) {
      let _this = this;
      if (_this.readonly !== true && _this.disabled !== true) {
        if (!flag && _this.zIndex) {
          PopupManager.zIndex = this.zIndex
        }
        _this.visible = true;
        _this._updateW();
        // setTimeout(() => {
        //   this.$refs.popover.updatePopper();
        // }, 100);
      }
    },
    // 点击控件外，判断是否隐藏弹出框
    _popoverHideFun(e) {
      let _this = this;
      let popperId = _this.$refs.popover.tooltipId;
      let path = e.path || (e.composedPath && e.composedPath());
      let isInter = path.some((list) => {
        return list.className && (list.className.toString().indexOf("is-empty-" + _this.id) !== -1 ||
            (list.getAttribute('aria-describedby') && list.getAttribute('aria-describedby').indexOf(popperId) !== -1));
      });

      if (!isInter) {
        this.visible = false;
      }
    },
    // 判断类型，抛出当前选中id
    _emitFun(val) {
      this.$emit("input", val);
      this.$emit("change", val);
      // this._updatePopoverLocationFun();
    },
    // 更新popover位置
    // _updatePopoverLocationFun() {
    //   // dom高度还没有更新，做一个延迟
    //   setTimeout(() => {
    //     this.$refs.popover.updatePopper();
    //   }, 50);
    // },
    /**
     * 销毁图标列表，不销毁输入框等
     */
    destroyIconList() {
      this.destroy = true
    },
    /**
     * 重新创建图标列表
     */
    createIconList() {
      this.destroy = false
    },
    show() {
      this._popoverShowFun(false)
    },
    hide() {
      this.visible = false
    }
  },
  computed: {
    dataList: function () {
      //去重
      let arr1 = []; // 新建一个数组来存放arr中的值
      for (let i = 0, len = this.iconList.length; i < len; i++) {
        if (arr1.indexOf(this.iconList[i]) === -1) {
          arr1.push(this.iconList[i]);
        }
      }
      return arr1;
    },
  },
  mounted() {
    this._updateW();
  },
  beforeDestroy() {
    off(document, "mouseup", this._popoverHideFun);
    this.destroyIconList();
  },
  created() {
    this.createIconList();
    this._initIcon(true);
  },
  watch: {
    value: function (val) {
      setTimeout(() => {
        this.name = val;
        this.prefixIcon = this.name ? this.name : this.defaultIcon;
      }, 50);
    },
    visible: function (val) {
      if (val === false) {
        this.$nextTick(() => {
          off(document, "mouseup", this._popoverHideFun);
        });
      } else {
        this.$nextTick(() => {
          this.createIconList();
          on(document, "mouseup", this._popoverHideFun);
        });
      }
    },
    options: {
      handler(newV, oldV) {
        let self = this;
        setTimeout(() => {
          self._initIcon(true);
        }, 50);
      },
      deep: true,
    },
  },
};
</script>

<style lang="css" scoped>
@import '~element-ui/lib/theme-chalk/input.css';
@import '~element-ui/lib/theme-chalk/popover.css';
@import '~element-ui/lib/theme-chalk/scrollbar.css';
@import '~element-ui/lib/theme-chalk/select-dropdown.css';

.fas-icon-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.ui-fas .el-input__inner {
  cursor: pointer;
}

.fas-icon-list li {
  width: 30px;
  height: 30px;
  margin: 5px;
}

.fas-icon-list li i, .fas-icon-list li svg {
  font-size: 20px;
  cursor: pointer;
}

.el-icon-popper {
  max-height: 400px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: hidden;
}

.el-icon-popper[x-placement^="bottom"] {
  margin-top: 5px;
}

.fas-no-data {
  display: block;
}

.e-icon {
  font-size: 16px;
}
</style>
