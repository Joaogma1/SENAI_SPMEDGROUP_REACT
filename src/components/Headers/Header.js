import React, { Component } from 'react'

import { parseJwt, usuarioAutenticado } from '../../services/auth';

import '../../services/auth';
export default class Header extends Component {
    NavBar(){
        var TipoUsuario = parseJwt().Role;
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
                            <div>
                            <span
                            // onClick={this.logout.bind(this)}
                            style={{ cursor: "pointer" }}
                            className="nav__sair">Sair</span>
                            </div>
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
                            <div>
                                {/* <button onclick={this.logout.bind(this)}> Sair</button> */}
                            </div>
                        </nav>
                    );
                case "medico":
                    return (
                        <nav>
                            <ul>
                                <li>
                                    <button href="MinhasConsultas">Minhas consultas</button>
                                </li>
                            </ul>
                            <div>
                                {/* <button onclick={this.logout.bind(this)}> Sair</button> */}
                            </div>
                        </nav>);
            }
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
