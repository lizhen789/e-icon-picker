import Vue from 'vue'

/** EIcon Component */
export declare class EIcon extends Vue {
    /** Install component into Vue */
    static install(vue: typeof Vue): void

    /** 选择器图标名 */
    iconName: string;

    /** 默认样式名 */
    className: string;
}
