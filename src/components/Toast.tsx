import React, { useContext } from 'react'
import { Layer, MessageBar, MessageBarType } from '@fluentui/react'
import { AppContext } from '../store/AppContext'

function Toast() {
  const { state } = useContext(AppContext)
  const type = state.toast.type
  const toastType = {
    'info': MessageBarType.info,
    'error': MessageBarType.error,
    'blocked': MessageBarType.blocked,
    'severeWarning': MessageBarType.severeWarning,
    'success': MessageBarType.success,
    'warning': MessageBarType.warning
  }
  return (
    <>
    {state.showToast &&
    (<Layer>
      <MessageBar
        messageBarType={toastType[type]}
      >{state.toast.message}</MessageBar>
    </Layer>)}
    </>
  )
}

export default Toast