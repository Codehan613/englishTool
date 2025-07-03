/*
 * @Author: hanlirong
 * @Date: 2025-02-11 16:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-11 16:42:29
 * @Description:  ts类型文件
 */

interface Window {
  mozRequestAnimationFrame: () => void;

  webkitRequestAnimationFrame: () => void;

  msRequestAnimationFrame: () => void;

  mozCancelAnimationFrame: () => void;
}

/**
 * App内数据类型
 */
declare namespace App {
  /**
   * 路由类型
   */
  type Route = {
    index?: boolean;
    id: string;
    path?: string;
    component: string;
    redirect?: string;
    children?: Array<Route>;
    handle?: Handle;
    parent?: string;
    protected?: boolean;
  };

  type Handle = {
    title?: string;
    icon?: string;
    roles?: string[]; // 'admin' | 'other'
  };
}
