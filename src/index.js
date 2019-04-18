import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CadastrarConsulta from './pages/Consultas/CadastrarConsulta'
import Login from '../src/pages/Login/Login'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<CadastrarConsulta />, document.getElementById('root'));

serviceWorker.unregister();
