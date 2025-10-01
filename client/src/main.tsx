import React from 'react'
import ReactDOM from 'react-dom/client'
import { runTests } from './test';
import VariableScene from './components/variableScene';

runTests();
// runTests(); // You can re-enable this if needed

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VariableScene width={500} height={500} />
  </React.StrictMode>,
)
