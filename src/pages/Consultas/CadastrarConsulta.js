import React, { Component } from 'react'
import Axios from "axios"
import Header from '../../components/Headers/Header'
export default class CadastrarConsulta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaMedicos: [],
            listaPacientes: [],
            listaConsultas: [],
            idPaciente: " ",
            idMedico: " ",
            dataConsulta: " ",
            statusConsulta: " ",
            descricao: " "
        }
    }
    atualizaEstadoIdPaciente(event) {
        this.setState({ idPaciente: event.target.value })
    }
    atualizaEstadoIdMedico(event) {
        this.setState({ idMedico: event.target.value });
    }
    atualizaEstadoDataConsulta(event) {
        this.setState({ dataConsulta: event.target.value })
    }
    atualizaStatusConsulta(event) {
        this.setState({ statusConsulta: event.target.value })
    }
    atualizaStatusDescricao(event) {
        this.setState({ descricao: event.target.value })
    }
    CadastrarConsulta(event) {
        event.preventDefault();
        Axios.post("http://localhost:5000/api/Consultas", {
            idPaciente: this.state.idPaciente,
            idMedico: this.state.idMedico,
            dataConsulta: this.state.dataConsulta,
            statusConsulta: this.state.statusConsulta,
            descricao: this.state.descricao
        }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('usuario-spmedgroup')
                }
            })
            .catch(erro => console.log(erro))
    }
    CarregarPacientes(event) {
        Axios.get('http://localhost:5000/api/Pacientes', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('usuario-spmedgroup')
            }
        })
            .then(data => {
                this.setState({ listaPacientes: data.data })
            })
    }
    CarregarMedicos(event) {
        Axios.get('http://localhost:5000/api/Medicos', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('usuario-spmedgroup')
            }
        })
            .then(data => {
                this.setState({ listaMedicos: data.data })
            })
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
    componentDidMount() {
        this.CarregarConsultas()
        this.CarregarMedicos()
        this.CarregarPacientes()
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div>
                    <form onSubmit={this.CadastrarConsulta.bind(this)}>
                        <label>
                            Nome Paciente
                                {/* Falta implementar isso nas outras coisas */}
                            <select>
                                {/* {this.state.listaTiposEventos.map(element => {
                                    return (
                                        <option key={element.id} value={element.id}>   
                                            {element.nome}
                                        </option>
                                    );
                                })} */}
                            </select>
                        </label>
                        <label>
                            nome Médico
                            <select>

                            </select>
                        </label>
                        <label>
                            Status
                            <input type="text" />
                        </label>
                        <label>
                            Data
                            <input type="date" />
                        </label>
                        <label>
                            Descricao
                            <textarea style={{ resize: "none" }}></textarea>
                        </label>
                    </form>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>dataConsulta</th>
                                <th>Paciente</th>
                                <th>Medico</th>
                                <th>statusConsulta</th>
                                <th>descricao</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listaConsultas.map(Element => {
                                return (
                                    <tr key={Element.id}>
                                        <td> {Element.id}</td>
                                        <td> {Element.dataConsulta}</td>
                                        <td>{Element.idPacienteNavigation.nome}</td>
                                        <td>{Element.idMedicoNavigation.nome}</td>
                                        <td>{Element.statusConsulta}</td>
                                        <td>{Element.descricao}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}
