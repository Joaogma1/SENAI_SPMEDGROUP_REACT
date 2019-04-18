import React, { Component } from 'react'
import { parseJwt, usuarioAutenticado } from '../../services/auth';
export default class ListagemConsulta extends Component {
  constructor(props) {
      super(props);
      this.state ={
          listaDeConsuta:[],

      }
  }
  listarConsulta(){
    var TipoUsuario = parseJwt().Role;
    // eslint-disable-next-line default-case
    switch (TipoUsuario) {
        case "administrador":
            return(
                this.state.listaDeConsuta.map((consulta) =>
                <tr key= {consulta.id}>
                    <td> {consulta.id}</td>
                    <td> {consulta.data}</td>
                    <td>{consulta.idMedicoNavigation.nome}</td>
                    <td>{consulta.idPacienteNavigation.nome}</td>
                    <td>{consulta.consulta.dataConsulta}</td>
                    <td>{consulta.consulta.statusConsulta}</td>
                </tr>)
            );
    
        case "paciente":
        return(
            this.state.listaDeConsuta.map((consulta) =>
            <tr key= {consulta.id}>
                <td> {consulta.id}</td>
                <td> {consulta.data}</td>
                <td>{consulta.idMedicoNavigation.nome}</td>
                <td>{consulta.consulta.dataConsulta}</td>
                <td>{consulta.consulta.statusConsulta}</td>
            </tr>)
        );
        case "medico":
        return(
            this.state.listaDeConsuta.map((consulta) =>
            <tr key= {consulta.id}>
                <td> {consulta.id}</td>
                <td> {consulta.data}</td>
                <td>{consulta.idPacienteNavigation.nome}</td>
                <td>{consulta.consulta.dataConsulta}</td>
                <td>{consulta.consulta.statusConsulta}</td>
            </tr>)
        );
    }
  }
  
    render() {
    return (
      <div>
        
      </div>
    )
  }
}
