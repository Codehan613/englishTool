/*
 * @Author: hanlirong
 * @Date: 2025-02-11 16:44:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-11 16:44:38
 * @Description: 响应类型
 */
/**
 * 接口response data类型
 */
declare namespace Res {
  /** response */
  interface ResponseRes<T = any> {
    code: number;
    data: T;
    msg: string;
  }
}
