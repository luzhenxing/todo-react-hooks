import React from 'react'
import { Dialog, Label, Stack, StackItem, getTheme } from '@fluentui/react'

const theme = getTheme()
const DialogInfo = (props: any) => {
  const formatDate = (date: any) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

  return (
    <Dialog
      hidden={props.hide}
      onDismiss={props.onHide}
      modalProps={{
        isBlocking: true
      }}
    >
      <Stack>
        <StackItem>
          <Label>创建时间</Label>
        </StackItem>
        <StackItem>{formatDate(props.item.date)}</StackItem>
      </Stack>
      <Stack>
        <StackItem>
          <Label>任务</Label>
        </StackItem>
        <StackItem styles={{root: { minHeight: 50 }}}>{props.item.title}</StackItem>
      </Stack>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <StackItem><Label>状态</Label></StackItem>
        {
          props.item.status ? (
            <StackItem styles={{root: { color: theme.palette.green }}}>完成</StackItem>
          ) : (
            <StackItem styles={{root: { color: theme.palette.orange }}}>未完成</StackItem>
          )
        }
      </Stack>
    </Dialog>
  )
}
export default DialogInfo
