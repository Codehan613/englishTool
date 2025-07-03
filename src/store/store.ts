/*
 * @Author: hanlirong
 * @Date: 2025-02-11 16:50:20
 * @LastEditors:
 * @LastEditTime: 2025-02-11 16:50:48
 * @Description: 创建自定义store
 */

import { StoreKey } from "@/common";
import { StoreApi, UseBoundStore, create } from "zustand";
import { PersistOptions, combine, devtools, persist } from "zustand/middleware";

type SetStoreState<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void;

export type STATE<T> = { key: keyof T; val: T[keyof T] };

export type MakeState = {
  updateTime: number;
};

export type MakeUpdater<T> = {
  SET_STATE: (data: STATE<T>) => void;
  SET_UPDATE_TIME: () => void;
  RESET: () => void;
};

type Store<S extends StoreApi<unknown>> = UseBoundStore<S>;

export type Methods<T, M> = (
  set: SetStoreState<T>,
  get: () => M & T & MakeUpdater<T>,
  store: Store<any>
) => M;

/**
 * 创建store
 * @param name store名称
 * @param state state
 * @param methods actions
 * @param persistOptions 持久化配置
 */
export function createCustomStore<T extends object, M>(
  name: StoreKey,
  state: T,
  methods: Methods<T & MakeState, M>,
  persistOptions: PersistOptions<T & MakeState>
) {
  const initialState: MakeState = {
    updateTime: 0,
  };

  const newStore = Object.assign(initialState, state);

  type State = T & MakeState;

  type Get = () => State & MakeUpdater<State> & M;

  type Set = Partial<MakeState & T>;

  type Update = State | Partial<State> | ((state: State) => State | Partial<State>);

  return create(
    devtools(
      persist(
        combine(
          newStore,

          (set, get, store) => ({
            ...methods(set as SetStoreState<State>, get as Get, store),

            /**
             * 一个通用set的方法 可用于偷懒
             * @param data
             */
            SET_STATE: (data: Update) => {
              set(data);
            },

            /**
             * 重置整个store
             */
            RESET() {
              set(newStore);
            },

            /**
             * 更新时间
             */
            SET_UPDATE_TIME() {
              set(() => ({ updateTime: Date.now() } as Set));
            },
          })
        ),
        persistOptions as never
      ),
      { name, enabled: true }
    )
  );
}

/**
 * 序列化map  因为zustand内对map的序列化有问题，所以手动转换
 * @param data get().xxx拿到的数据
 * @returns
 */
export function serializerMap<T>(data: object): T {
  return new Map(Object.entries(data)) as T;
}

/**
 * 反序列化map
 * @param data serializerMap的map
 * @returns
 */
export function deserializerMap<T>(data: Map<string, unknown>): T {
  return Object.fromEntries(data) as T;
}
