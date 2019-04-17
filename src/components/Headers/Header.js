import React, { Component } from 'react'
import { parseJwt, usuarioAutenticado } from '../../services/auth';
export default class Header extends Component {

    logout(){
        localStorage.removeItem("usuario-spmedgroup");
    }
    NavBar(){
        var TipoUsuario = parseJwt().Role;
        try {
            if (usuarioAutenticado) {
                // eslint-disable-next-line default-case
                switch (TipoUsuario) {
                    case "administrador":
                        return (
                            <nav>
                                <ul>
                                    <li>
                                        <button href="MinhasConsultas">Lista de medicos</button>
                                    </li>
                                    <li>
                                        <button href="MinhasConsultas"> Lista de pacientes</button>
                                    </li>
                                    <li>
                                        <button href="MinhasConsultas">
                                            Cadastrar de consulta
                                        </button>
                                    </li>
                                    <li>
                                        <button href="MinhasConsultas">Lista de consultas</button>
                                    </li>
                                </ul>
                            </nav>
                        );
                    case "paciente":
                        return (
                            <nav>
                                <ul>
                                    <li>
                                        <button href="MinhasConsultas">Lista de medicos</button>
                                    </li>
                                    <li>
                                        <button href="MinhasConsultas">Minhas consultas</button>
                                    </li>
                                </ul>
                            </nav>
                        );
                    case "medico":
                        return (
                            <nav>
                                <ul>
                                    <li>
                                        <button href="MinhasConsultas">Minhas consultas</button>
                                    </li>
                                    <li>
                                    <button onClick={this.logout.bind(this)}>Sair</button>
                                    </li>
                                </ul>
                            </nav>);
                }
            }else{
                return(
                    <span> Você deve estar logado !</span>
                );
            }
        } catch {
            return(
                <span> Você deve estar logado !</span>
            );
        }

    }
    render() {
        return (
            <header>
            {this.NavBar()}
            </header>
        );
    }
}
