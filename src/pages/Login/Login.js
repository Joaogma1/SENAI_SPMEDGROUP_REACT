import React, { Component } from 'react'
import Axios from "axios";
import 'react-router-dom';
import logo from './icon-login.png'
import {usuarioAutenticado } from '../../services/auth'
// import { link, withRouter } from 'react-router'
import './Login.css'
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: '',
            isEnabled : true
        }
    }
    verificaAutenticado(){
        if (usuarioAutenticado) {
            this.props.history.push("/minhasConsultas")
        }
    }
    componentDidMount(){
        //console.log(usuarioAutenticado();
        if (usuarioAutenticado()) {
            this.props.history.push("/minhasConsultas")
        }
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
    }



    render() {
        return (
            <div>
                <div className="login-page">
             <div class="form">
             <form className="login-form" onSubmit={this.efetuarLogin.bind(this)}>
                        <img src={logo} className ="logo__form" alt="Logo SPMedGroup" />
                        <h1 style ={{margin: "10px auto"}}>SPMedGroup</h1>
                 <h2 style ={{ paddingBottom:" 0.3em"}}>Login</h2>
                    <input
                    id="inputEmail" 
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
                     <button id="btn__login" type="submit">Logar</button>
                 </form>
             </div>
         </div>
            </div>
        )
    }
}
