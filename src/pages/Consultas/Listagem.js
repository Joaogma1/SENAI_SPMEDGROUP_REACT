import React, { Component } from 'react'
import { parseJwt } from '../../services/auth';
import Axios from 'axios';
import Header from '../../components/Headers/Header'
export default class Listagem extends Component {
    constructor(props) {
        super(props);
        this.state ={
            listaConsultas:[]
        }
    }
    componentDidMount(){
        this.CarregarConsultas()
        
    }
    CarregarConsultas(event) {
        Axios.get('http://localhost:5000/api/Consultas/Usuario', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('usuario-spmedgroup')
            }
        })
            .then(data => {
                this.setState({ listaConsultas: data.data })
            })
    }
    
    render() {
    return (
        <div>
        <Header></Header>
                           <table>
                        <thead>
                        {
                                (parseJwt().Role === 'medico') ?
                                // verdade
                               (
                                        <tr >
                                            <th>Data Consulta</th>
                                            <th>Paciente</th>
                                            <th>Status</th>
                                            <th>Descricao</th>
                                        </tr>
                                  ) :
                                // else if 
                                ((parseJwt().Role === 'paciente') ? 
                                // renderiza else if
                                (
                                        <tr>
                                            <th>Data Consulta</th>
                                            <th>Medico</th>
                                            <th>Status</th>
                                        </tr>
                                    
                                ) : (console.log('Você é um admin'))
                                )

                            }
                        </thead>
                        <tbody>
                            {
                                (parseJwt().Role === 'medico') ?
                                // verdade
                                (this.state.listaConsultas.map(Element => {
                                    return (
                                        <tr key={Element.id}>
                                            <td> {Element.dataConsulta}</td>
                                            <td>{Element.idPacienteNavigation.nome}</td>
                                            <td>{Element.statusConsulta}</td>
                                            <td>{Element.descricao}</td>
                                        </tr>
                                    );
                                })) :
                                // else if 
                                ((parseJwt().Role === 'paciente') ? 
                                // renderiza else if
                                (this.state.listaConsultas.map(Element => {
                                    return (
                                        <tr key={Element.id}>
                                            <td> {Element.dataConsulta}</td>
                                            <td>{Element.idMedicoNavigation.nome}</td>
                                            <td>{Element.statusConsulta}</td>
                                        </tr>
                                    );
                                })) : (console.log('Você é um admin'))
                                )

                            }
                        </tbody>
                        
                    </table>
      </div>
    )
  }
}
