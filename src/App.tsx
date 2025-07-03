/*
 * @Author: hanlirong
 * @Date: 2025-02-10 12:31:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-12 10:03:11
 * @Description: 路由鉴权
 */

import { Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";

// import Loading from '@/components/Loading';

import r, { generateRouter } from "./router";
import { usePermission, useSelector } from "./store";
import Loading from "@/pages/components/loading";

export default function App() {
  const [router, setRouter] = useState(r);
  const { GenerateRoutes } = usePermission(useSelector(["GenerateRoutes"]));

  useEffect(() => {
    GenerateRoutes().then((r: any) => {
      setRouter(generateRouter(r));
    });
  }, []);

  return (
    // <Suspense fallback={<Loading />}>

    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
