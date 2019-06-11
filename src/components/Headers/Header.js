import React, { Component } from 'react'
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import {Link} from 'react-router-dom';
import logo from './icon-login.png'
import './header.css'
export default class Header extends Component {

    logout() {
        localStorage.removeItem("usuario-spmedgroup");
        window.location.reload();
    }
    NavBar() {
        var TipoUsuario = parseJwt().Role;
        try {
            if (usuarioAutenticado) {
                // eslint-disable-next-line default-case
                switch (TipoUsuario) {
                    case "administrador":
                        return (
                            <nav id="menuTopo" className="menu">
                                <ul className= "escondido">
                                    <li>
                                        <Link to="/medicos">Lista de medicos</Link>
                                    </li>
                                    <li>
                                        <Link to="/pacientes"> Lista de pacientes</Link>
                                    </li>
                                    <li>
                                        <Link to="/cadastrarConsulta">
                                            Gerenciamento de consulta
                                        </Link>
                                    </li>
                                    <li>
                                    <Link to ="/login" onClick={this.logout.bind(this)}>Sair</Link>
                                    </li>
                                </ul>
                            </nav>
                        );
                    case "paciente":
                        return (
                            <nav id="menuTopo" className="menu">
                                <ul className= "escondido">
                                    <li>
                                        <Link to= "/medicos">Lista de medicos</Link>
                                    </li>
                                    <li>
                                        <Link to ="/minhasConsultas">Minhas consultas</Link>
                                    </li>
                                    <li>
                                        <Link to ="/Cadastrarlocalizacao">Cadastrar residencia</Link>
                                    </li>x
                                    <li>
                                    <Link to ="/login" onClick={this.logout.bind(this)}>Sair</Link>
                                    </li>
                                    
                                </ul>
                            </nav>
                        );
                    case "medico":
                        return (
                            <nav id="menuTopo" className="menu">
                                <ul className= "escondido">
                                    <li>
                                        <Link to ="/minhasConsultas">Minhas consultas</Link>
                                    </li>
                                    <li>
                                        <Link to ="/Cadastrarlocalizacao">Cadastrar residencia</Link>
                                    </li>
                                    <li>
                                        <Link to ="/login" onClick={this.logout.bind(this)}>Sair</Link>
                                    </li>
                                </ul>
                            </nav>);
                }
            } 
        } catch {
            
        }

    }
    render() {
        return (
            <header className="top-bar">
                <div className="logo">
                <img src={logo} className="logo__header" alt="Logo SPMedGroup" />
                </div>
                {this.NavBar()}
            </header>
        );
    }
}
