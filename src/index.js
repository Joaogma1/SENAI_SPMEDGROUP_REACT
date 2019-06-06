import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import './index.css';
import Cadastrar from './pages/Consultas/Cadastrar'
import ListaPacientes from './pages/Pacientes/ListaPacientes'
import Listagem from './pages/Consultas/Listagem'
import ListaMed from './pages/Medicos/ListaMed'
import Login from '../src/pages/Login/Login'
import Localizacao from '../src/pages/Localização/Localizacao'
import { usuarioAutenticado } from './services/auth';
import { parseJwt } from './services/auth';
import * as serviceWorker from './serviceWorker';


const PermissaoAdmin = ({component: Component}) =>(
    <Route
    render={props =>
      usuarioAutenticado() && parseJwt().Role === "administrador" ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);
const PermissaoUsuario = ({component : Component}) => (
    <Route
    render={props =>
      usuarioAutenticado() && (parseJwt().Role === "paciente" || parseJwt().Role === "medico"|| parseJwt().Role === "administrador")  ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);
const routing = (
    <Router>
      <div>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <PermissaoAdmin path= "/cadastrarConsulta" component ={Cadastrar}/>
        <PermissaoAdmin path= "/pacientes" component ={ListaPacientes}/>
        <PermissaoUsuario path="/minhasConsultas" component={Listagem}/>
        <PermissaoUsuario path= "/medicos" component ={ListaMed}/>
        <PermissaoUsuario path= "/Cadastrarlocalizacao" component ={Localizacao}/>        
        </Switch>
      </div>
    </Router>
  );

 // eslint-disable-next-line no-lone-blocks
 {/* <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          
          <PermissaoAdmin path="/tiposeventos" component={TiposEventos} />
          
          <PermissaoComum exact path="/eventos" component={EventoIndex} />
          <PermissaoAdmin path="/eventos/cadastrar" component={EventoCadastro} /> */}
          
ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
