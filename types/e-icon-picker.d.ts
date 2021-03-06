import Vue from 'vue'

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'
export type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export interface EIconPickerOptions {
    addIconList: string[],
    removeIconList: string[],
    FontAwesome: boolean,
    ElementUI: boolean,
    eIcon: boolean,
    eIconSymbol: boolean,
    /**zIndex 只能在全局设置，不支持组件参数*/
    zIndex: number
}

/** EIconPicker Component */
export declare class EIconPicker extends Vue {
    /** Install component into Vue */
    static install(vue: typeof Vue): void

    /** 是否禁用 */
    disabled: boolean;

    /**只读 */
    readonly: boolean;

    /** 可清空 */
    clearable: boolean;

    /** 样式 */
    styles: {};

    /** 弹出框位置 */
    placement: PopoverPlacement;

    /** 默认值 */
    value: string;

    /** 组件相关参数*/
    options: EIconPickerOptions;

    /** 宽度 */
    width: number;

    /** 输入框尺寸 */
    size: ComponentSize;

    /** 提示文字 */
    placeholder: string;

    /** 默认显示图标 */
    defaultIcon: string;

    /** 图标列表为空时默认显示的文本 */
    emptyText: string;

    /** 图标高亮 #FF0000 */
    highLightColor: string;

    /**
     * 销毁图标列表，不销毁输入框等
     */
    destroyIconList: Function;
    /**
     * 重新创建图标列表
     */
    createIconList: Function;
    /**
     * 触发选择器
     */
    show: Function;
    /**
     * 隐藏选择器
     */
    hide: Function;
}
