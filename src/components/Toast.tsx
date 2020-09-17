import React, { useContext } from 'react'
import { Layer, MessageBar, MessageBarType } from '@fluentui/react'
import { AppContext } from '../store/AppContext'

function Toast() {
  const { state } = useContext(AppContext)
  const type = state.toast.type
  const toastType = {
    'info': MessageBarType.info,
    /** Error styled MessageBar */
    'error': MessageBarType.error,
    /** Blocked styled MessageBar */
    'blocked': MessageBarType.blocked,
    /** SevereWarning styled MessageBar */
    'severeWarning': MessageBarType.severeWarning,
    /** Success styled MessageBar */
    'success': MessageBarType.success,
    /** Warning styled MessageBar */
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