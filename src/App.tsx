import React from 'react';

import Header from './components/Header'
import TodoList from './components/TodoList'
import AppProvider from './store/AppContext';
import Toast from './components/Toast'

function App() {
  return (
    <AppProvider>
      <Toast></Toast>
      <Header></Header>
      <TodoList></TodoList>
    </AppProvider>
  );
}

export default App;
