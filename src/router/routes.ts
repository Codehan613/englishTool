/*
 * @Author: hanlirong
 * @Date: 2025-02-11 12:33:14
 * @LastEditors:
 * @LastEditTime: 2025-02-11 12:59:23
 * @Description: 路由表
 */

import { ComponentType, lazy } from "react";

import { LoginAction, LoginLoader, LogoutAction, RootLoader, ProtectedLoader } from "../permission";

// eslint-disable-next-line react-refresh/only-export-components
const BasicsLayout = lazy(() => import("@/layouts/basics"));

import { RouteObject, Navigate } from "react-router-dom";
type Module = {
  [keys in string]: () => Promise<{ default: ComponentType<any> }>;
};

/** 所有pages下页面文件 */
const pagesModules = import.meta.glob("@/pages/*/index.tsx") as unknown as Module;
/** 所有pages\*\router下嵌套页面文件 */
const nestModules = import.meta.glob("@/pages/*/router/*/index.tsx") as unknown as Module;
console.log(pagesModules);
/** 所有页面文件 */
export const modules: Module = {
  ...pagesModules,
  ...nestModules,
};
console.log(getPath("home"));

const routes: RouteObject[] = [
  {
    id: "root",
    path: "/",
    loader: RootLoader,
    Component: BasicsLayout,

    // children: [
    //   {
    //     index: true,
    //     element: <Navigate to="/database" replace />,
    //     // Component: lazy(modules[getPath("login")]),
    //   },
    // ],
  },
  {
    path: "/database",
    loader: ProtectedLoader,
    Component: lazy(modules[getPath("home")]),
    // children: [{ index: true, Component:  }],
  },
  {
    path: "/createGramer",
    loader: ProtectedLoader,
    action: LoginAction,
    Component: lazy(modules[getPath("CreateGramer")]),
  },
  {
    path: "/login",
    loader: LoginLoader,
    action: LoginAction,
    Component: lazy(modules[getPath("login")]),
  },
  {
    // logout路由只用来退出登录，不展示页面
    path: "/logout",
    action: LogoutAction,
    Component: lazy(modules[getPath("error")]),
  },
  {
    path: "*",
    Component: lazy(modules[getPath("error")]),
  },
];

export default routes;

/**
 * 获取页面路径
 * @param name
 * @returns
 */
export function getPath(name: string) {
  return `/src/pages/${name}/index.tsx`;
}
