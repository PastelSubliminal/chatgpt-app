"use client";

import { Dispatch, useMemo, createContext, ReactNode, useContext, useReducer } from "react";
import { reducer, Action, initState } from '@/reducers/AppReducer'

type State = {
  displayNavigation: boolean; // 是否显示导航栏
  themeMode: 'dark' | 'light'
};

// 参数类型
type AppContextProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

// 使用 context API 创建 context
const AppContext = createContext<AppContextProps>(null!);

export default function AppContextProvider({
    children,
}: {
  children: ReactNode;
}) {
    const [state, dispatch] = useReducer(reducer, initState)
    // 缓存计算结果(计算函数, 依赖项)，进行初始计算后，只有依赖项改变才会重新计算
    const contextValue = useMemo(()=>{
        return {state, dispatch}
    },[state, dispatch])
    return (
        <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
  ) 
}

export function useAppContext() {
    return useContext(AppContext)
}