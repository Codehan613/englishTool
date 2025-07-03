/*
 * @Author: hanlirong
 * @Date: 2025-02-11 11:53:23
 * @LastEditors:
 * @LastEditTime: 2025-02-11 13:09:18
 * @Description: 路由信息
 */

import routes from "./routes";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export default createBrowserRouter(routes);

/**
 * 生成路由表
 * @param routes 路由数组
 * @returns
 */
export function generateRouter(routes: RouteObject[]) {
  return createBrowserRouter(routes);
}
