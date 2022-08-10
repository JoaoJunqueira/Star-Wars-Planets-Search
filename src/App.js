import React from 'react';
import Provider from './context/myProvider';
import Form from './components/Form';
import Table from './components/Table';
import Sort from './components/Sort';
// import request from './requestAPI';
// import './App.css';

function App() {
  return (
    <Provider>
      <Form />
      <Sort />
      <Table />
    </Provider>
  );
}

export default App;
