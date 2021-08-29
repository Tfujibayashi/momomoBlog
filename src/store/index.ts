import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
 
// ストアの型を定義する
export interface State {
  userId: string
}
 
// InjectionKeyを定義する
export const key: InjectionKey<Store<State>> = Symbol()
 
// Storeを作成する
export const store = createStore<State>({
  state: {
    userId: ''
  },
  getters: {
    userId: state => state.userId
  },
  mutations: {
    updateFlag (state, flag) {
      state.userId = flag;
    }
  }
})
 
// 独自のuserStoreメソッドを定義する
export function useStore () {
  // InjectionKeyをuserStoreメソッドに渡す
  return baseUseStore(key)
}