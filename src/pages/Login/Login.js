import React, { Component } from 'react'
import Axios from "axios";
import 'react-router-dom';
import logo from './icon-login.png'
import { parseJwt, usuarioAutenticado } from '../../services/auth'
// import { link, withRouter } from 'react-router'
import './Login.css'
import { timeout } from 'q';
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: ''
        }
    }
    verificaLogado(){
        if (usuarioAutenticado) {
            timeout()
            // this.props.history.push("/minhasConsultas");
        }
    }
    componentDidMount() {
    this.verificaLogado();
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
                <div class="login-page">
             <div class="form">
             <form className="login-form" onSubmit={this.efetuarLogin.bind(this)}>
                        <img src={logo} className ="logo__form" alt="Logo SPMedGroup" />
                        <h1 style ={{margin: "10px auto"}}>SPMedGroup</h1>
                 <h2 style ={{ paddingBottom:" 0.3em"}}>Login</h2>
                    <input 
                    type="email" 
                   name="email" 
                     value={this.state.email}
                     onChange={this.atualizaEstadoEmail.bind(this)}
                    placeholder="E-mail" />
                   <input 
                     type="password" 
                    name="senha" 
                    placeholder="Senha" 
                    value={this.state.senha}
                     onChange={this.atualizaEstadoSenha.bind(this)} />
                     <button type="submit">Logar</button>
                 </form>
             </div>
         </div>
            </div>
        )
    }
}
