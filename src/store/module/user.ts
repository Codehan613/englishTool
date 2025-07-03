/*
 * @Author: hanlirong
 * @Date: 2025-02-10 15:44:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-11 09:53:41
 * @Description: 用户信息state
 */
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type Store = {
  token: string;
};
const APP_KEY = "h5bio";
type Actions = {
  SET_TOKEN: (token: string) => void;
  REMOVE_TOKEN: () => void;
  RESET: () => void;
  SET_STATE: (data: { key: keyof Store; value: Store[keyof Store] }) => void;
};

// 初始化state
const initialState = (): Store => ({
  token: "",
});

// create（）：存在三个参数，第一个参数为函数，第二个参数为布尔值
// 第一个参数：(set、get、api)=>{…}
// 第二个参数：true/false
// 若第二个参数不传或者传false时，则调用修改状态的方法后得到的新状态将会和create方法原来的返回值进行融合；
// 若第二个参数传true时，则调用修改状态的方法后得到的新状态将会直接覆盖create方法原来的返回值。
const APP_STORE_VERSION = 1;
enum StoreKey {
  APP = `app-store-${APP_KEY}`,
  SETTINGS = `settings-store-${APP_KEY}`,
  PERMISSION = `permission-store-${APP_KEY}`,
  POPUP = `popup-store-${APP_KEY}`,
}
export const useUserStore = create<Store & Actions>()(
  devtools(
    persist(
      set => ({
        ...initialState(),

        SET_STATE(data: { key: keyof Store; value: Store[keyof Store] }) {
          set({ [data.key]: data.value });
        },
        SET_TOKEN(token) {
          // set({ token })
          set(() => ({ token }));
        },

        REMOVE_TOKEN() {
          set({ token: "" });
          // set(state => ({ token: '' }))
        },
        RESET() {
          set(initialState());
        },
      }),
      // 数据迁移版本不同进行数据改变
      {
        name: StoreKey.APP, // unique name
        storage: createJSONStorage(() => localStorage),//持久化存储方式
        version: APP_STORE_VERSION, // a migration will be triggered if the version in the storage mismatches this one

        // migration logic
        migrate: (persistedState, version) => {
          const state = initialState();

          if (version !== APP_STORE_VERSION) {  //版本与存储的版本不一致
            //Object.assign 静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。
            Object.assign(state, persistedState); //将存储的状态合并到当前的状态中
          }
          return state;
        },

        // Filter the persisted value. By default, everything is persisted.
        //筛选持久化存储的值,指定持久化存储的数据，默认全部存储
        // partialize: state => ({
        //   openId: state.openId,
        //   token: state.token
        // })
      }
    ),
    // devtools配置
    {
      name: StoreKey.APP,
      // 是否开启
      enabled: true,
    }
  )
);
