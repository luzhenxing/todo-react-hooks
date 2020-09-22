import React, { useState } from 'react'
import { Dialog, TextField, Toggle, Stack, StackItem, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react'

const DialogInfo = (props: any) => {
  const formatDate = (date: any) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

  const [status, setStatus] = useState(props.item.status);
  const [title, setTitle] = useState(props.item.title);

  return (
    <Dialog
      hidden={props.hide}
      onDismiss={props.onHide}
      modalProps={{ isBlocking: true }}
    >
      <Stack tokens={{ childrenGap: 10 }}>
        <StackItem>
          <TextField label="创建时间" defaultValue={formatDate(new Date(props.item.date))} disabled />
        </StackItem>
        <StackItem>
          <TextField label="任务" defaultValue={title} multiline rows={3} onChange={(e: React.FormEvent, val: string | undefined) => {
            setTitle(val)
          }} />
        </StackItem>
        <StackItem>
          <Toggle label="状态" inlineLabel defaultChecked={status} onText="完成" offText="未完成" onChange={(e: React.MouseEvent<HTMLElement>, checked: boolean | undefined) => {
            setStatus(checked)
          }} />
        </StackItem>
      </Stack>
      <DialogFooter>
        <DefaultButton text="取消" onClick={props.onHide} />
        <PrimaryButton text="保存" onClick={() => {
          props.onSave(props.index, title, status)
        }} />
      </DialogFooter>
    </Dialog>
  )
}
export default DialogInfo
