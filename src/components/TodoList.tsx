/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import { AppContext, FETCH_ITEM, EDIT_ITEM, DELETE_ITEM, Item } from '../store/AppContext'

import { DetailsList, DetailsRow, IColumn, PrimaryButton, Stack, getTheme, IDetailsListProps, IDetailsRowStyles, mergeStyles, SelectionMode, Checkbox } from '@fluentui/react'
import DialogInfo from './DialogInfo'
import DialogEdit from './DialogEdit'

const theme = getTheme()

const buttonClass = mergeStyles({
  fontSize: '12px',
  padding: '0',
  minWidth: '40px',
  height: '22px'
})

const doneClass = mergeStyles({
  textDecoration: 'line-through'
})

function TodoList() {
  const { state, dispatch } = useContext(AppContext)
  const [DialogInfoHide, setDialogInfoHide] = useState(true);
  const [DialogEditHide, setDialogEditHide] = useState(true);
  const [item, setItem] = useState<Item | {}>({})
  const [index, setIndex] = useState<number | undefined>(0);

  useEffect(() => {
    fetchTodoData()
  }, [])

  const fetchTodoData = () => {
    // const data: Array<Item> = JSON.parse(localStorage.getItem('todo') || '[]')

    setTimeout(() =>{
      dispatch({type: FETCH_ITEM})
    }, 1500)
  }

  const columns: IColumn[] = [{
    key: 'col1',
    name: '',
    minWidth: 20,
    maxWidth: 20,
    onRender: (item: any, index: number | undefined) => <Checkbox checked={item.status} onChange={(e: React.FormEvent | undefined, checked: boolean | undefined) => {
      dispatch({
        type: EDIT_ITEM,
        index,
        title: item.title,
        status: checked
      })
    }} />
  }, {
    key: 'col2',
    name: '任务',
    fieldName: 'title',
    minWidth: 100,
    onRender(item: any) {
      if (item.status) {
        return <span className={doneClass}>{item.title}</span>
      } else {
        return item.title
      }
    }
  }, {
    key: 'col3',
    name: '操作',
    minWidth: 140,
    onRender: (item: any, index: number | undefined) => (
      <Stack horizontal tokens={{
        childrenGap: 10
      }}>
        <PrimaryButton className={buttonClass} onClick={() => {
          setItem(item)
          setDialogInfoHide(false)
        }}>查看</PrimaryButton>
        <PrimaryButton className={buttonClass} style={{
          borderColor: theme.palette.orangeLighter,
          backgroundColor: theme.palette.orangeLighter
        }} onClick={() => {
          setItem(item)
          setIndex(index)
          setDialogEditHide(false)
        }}>编辑</PrimaryButton>
        <PrimaryButton className={buttonClass} style={{
          borderColor: theme.palette.orangeLight,
          backgroundColor: theme.palette.orangeLight
        }} onClick={() => {
          dispatch({ type: DELETE_ITEM, index})
        }}>删除</PrimaryButton>
      </Stack>
    )
  }]

  const onRenderRow: IDetailsListProps['onRenderRow'] = props => {
    if (props) {
      const iRowStyle: Partial<IDetailsRowStyles> = {}

      if (props.itemIndex % 2 === 0) {
        iRowStyle.root = {
          backgroundColor: theme.palette.themeLighter
        }
      }

      return <DetailsRow {...props} styles={iRowStyle} />
    }

    return null;
  }

  const save = (index: number, title: string, status: boolean) => {
    dispatch({
      type: EDIT_ITEM,
      index,
      title,
      status
    })
    setDialogEditHide(true)
  }

  return (
    <>
      <DetailsList
        items={state.item}
        columns={columns}
        selectionMode={SelectionMode.none}
        isHeaderVisible={false}
        onRenderRow={onRenderRow}
      >
      </DetailsList>
      {!DialogInfoHide && (<DialogInfo hide={DialogInfoHide} item={item} onHide={() => setDialogInfoHide(true)}></DialogInfo>)}
      {!DialogEditHide && (<DialogEdit hide={DialogEditHide} item={item} index={index} onSave={save} onHide={() => setDialogEditHide(true)}></DialogEdit>)}
    </>
  )
}
export default TodoList