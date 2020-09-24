/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useReducer, useEffect } from 'react'
import { reducer, HIDE_TOAST } from './reducer'

export interface Item {
  title: string,
  status: boolean,
  date?: Date
}

export interface Toast {
  message: string,
  type: 'info' | 'error' | 'blocked' | 'severeWarning' | 'success' | 'warning',
  duration?: number
}

export interface Store {
  item: Array<Item>
  showToast: boolean
  toast: Toast
}

const initialState: Store = {
  item: [],
  showToast: false,
  toast: {
    message: '提示',
    type: 'info',
    duration: 1500
  }
}

export const AppContext = createContext<{
  state: Store,
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null
})

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.showToast && state.toast.duration) {
      setTimeout(() => dispatch({ type: HIDE_TOAST }), state.toast.duration)
    }
  }, [state.showToast]);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export * from './reducer'

export default AppProvider
