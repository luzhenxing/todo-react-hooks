import React, { useContext, useState } from 'react'
import { AppContext, ADD_ITEM, SHOW_TOAST, Item } from '../store/AppContext'

import { Stack, Callout, TextField, PrimaryButton, IconButton, IStackTokens, getTheme, mergeStyleSets } from '@fluentui/react'

const theme = getTheme()

const styles = mergeStyleSets({
  header: {
    background: theme.palette.themePrimary,
    color: theme.palette.white
  },
  title: {
    fontSize: theme.fonts.large.fontSize,
    fontWeight: theme.fonts.large.fontWeight
  },
  button: {
    verticalAlign: 'top',
    fontSize: theme.fonts.large.fontSize,
    color: theme.palette.white
  }
})

const stackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10
}

function Header () {
  const [ isCalloutVisible, setIsCalloutVisible ] = useState(false)
  const [ title, setTitle ] = useState('')
  const { dispatch } = useContext(AppContext)

  const addItem = () => {
    if (!title.trim()) {
      dispatch({ type: SHOW_TOAST, toast: {
        message: '请填写任务名',
        type: 'error'
      }})
      return
    }
    const data: Item = {
      title: title,
      status: false,
      date: new Date()
    }
    dispatch({type: ADD_ITEM, item: data })
    setIsCalloutVisible(false)
    setTitle('')
  }
  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center" className={styles.header} tokens={stackTokens}>
      <Stack.Item className={styles.title}>todo list</Stack.Item>
      <Stack.Item>
        <IconButton id="button" iconProps={{ iconName: 'Add' }} className={styles.button} onClick={() => setIsCalloutVisible(true)} />
        {isCalloutVisible && (
          <Callout
            target="#button"
            onDismiss={() => setIsCalloutVisible(false)}
            gapSpace={4}
          >
            <Stack tokens={stackTokens} horizontalAlign="end">
              <Stack.Item>
                <TextField placeholder="任务" style={{width: 300}} value={title} autoComplete="off" onChange={(_, v) => setTitle(v || '')}></TextField>
              </Stack.Item>
              <Stack.Item>
                <PrimaryButton type="submit" onClick={addItem}>增加todo</PrimaryButton>
              </Stack.Item>
            </Stack>
          </Callout>
        )}
      </Stack.Item>
    </Stack>
  )
}

export default Header