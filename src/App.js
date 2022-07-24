import React from 'react';
import Provider from './context/myProvider';
import Form from './components/Form';
import Table from './components/Table';
// import request from './requestAPI';
// import './App.css';

function App() {
  return (
    <Provider>
      <Form />
      <Table />
    </Provider>
  );
}

export default App;
