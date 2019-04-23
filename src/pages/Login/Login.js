import React, { Component } from 'react'
import Axios from "axios";
import 'react-router-dom';
// import { link, withRouter } from 'react-router'
import { parseJwt, usuarioAutenticado } from '../../services/auth';
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: ''
        }
    }
    componentDidMount() {
    
    }
    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }
    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }
    efetuarLogin(event) {
        event.preventDefault();
        Axios.post("http://localhost:5000/api/Login", {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem("usuario-spmedgroup", data.data.token);
                    this.props.history.push("/minhasConsultas");
                    window.location.reload();
                }
            })
            .catch(erro => console.log(erro))
        console.log(parseJwt().Role);
    }



    render() {

        return (
            <div>
                <form onSubmit={this.efetuarLogin.bind(this)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            className="input__login"
                            placeholder="Digite seu email"
                            type="email"
                            value={this.state.email}
                            onChange={this.atualizaEstadoEmail.bind(this)}
                            name="email" />
                    </div>
                    <div>
                        <label htmlFor="senha">Senha</label>
                        <input
                            className="input__senha"
                            placeholder="Digite sua Senha"
                            type="password"
                            value={this.state.senha}
                            onChange={this.atualizaEstadoSenha.bind(this)}
                            name="senha" />
                    </div>
                    <button type="submit" className="btn__login" id="btn__login">
                        Login
                </button>
                </form>
            </div>
        )
    }
}
