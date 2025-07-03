/*
 * @Author: hanlirong
 * @Date: 2025-02-11 16:46:59
 * @LastEditors: 
 * @LastEditTime: 2025-02-11 16:47:10
 * @Description: 枚举类型定义文件

 */
export const APP_KEY = 'react-mobile-template';

/**
 * store key
 */
export enum StoreKey {
  APP = `app-store-${APP_KEY}`,
  SETTINGS = `settings-store-${APP_KEY}`,
  PERMISSION = `permission-store-${APP_KEY}`,
  POPUP = `popup-store-${APP_KEY}`
}

/**
 * 主题
 */
export enum Theme {
  light = 'light',
  dark = 'dark'
}