import { Store, Item } from './AppContext'

export const FETCH_ITEM: string = 'FETCH_ITEM'
export const ADD_ITEM: string = 'ADD_ITEM'
export const EDIT_ITEM: string = 'EDIT_ITEM'
export const DELETE_ITEM: string = 'DELETE_ITEM'
export const SHOW_TOAST: string = 'SHOW_TOAST'
export const HIDE_TOAST: string = 'HIDE_TOAST'

const fetchTodoItem = () => JSON.parse(localStorage.getItem('todo') || '[]')
const saveTodoItem = (item: Array<Item>) => localStorage.setItem('todo', JSON.stringify(item))

export const reducer = (state: Store, action: any) => {
  let item: Array<Item>
  switch (action.type) {
    case FETCH_ITEM:
      item = fetchTodoItem()
      return Object.assign({}, state, { item })
    case ADD_ITEM:
      item = [...state.item, action.item]
      saveTodoItem(item)
      return Object.assign({}, state, { item })
    case EDIT_ITEM:
      const { index, title, status } = action
      state.item[index].title = title
      state.item[index].status = status
      saveTodoItem(state.item)
      return Object.assign({}, state)
    case DELETE_ITEM:
      item = state.item.filter((o, i) => i !== action.index)
      saveTodoItem(item)
      return Object.assign({}, state, { item })

    case SHOW_TOAST:
      const toast = Object.assign({}, state.toast, action.toast)
      return Object.assign({}, state, { showToast: true, toast })
    case HIDE_TOAST:
      return Object.assign({}, state, { showToast: false })
    default:
      return state
  }
}
