import React from 'react'
import ReactDOM from 'react-dom/client'
import { runTests } from './test.js';
import VariableScene from './components/variableScene.js';
import { generate } from './rpc_clients/gatewayService.js';

runTests();
// runTests(); // You can re-enable this if needed

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VariableScene width={500} height={500} />
  </React.StrictMode>,
)
