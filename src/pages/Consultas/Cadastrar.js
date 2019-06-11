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
            descricao: " ",
            hora:""
        }

        
    }
    atualizaEstadoIdPaciente(event) {
        this.setState({ idPaciente: event.target.value })
    }
    atualizaEstadoIdMedico(event) {
        this.setState({ idMedico: event.target.value });
    }
    atualizaEstadoHora(event) {
        this.setState({ hora: event.target.value });
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
            .then(data => {
                if (data.status === 200) {
                    window.location.reload();
                }
            })
            
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
        const data = new Date();
        const dataMinima = data.getFullYear().toString()  ;
        return (
            <div>
                <Header></Header>
                <span>{dataMinima}</span>
                <div className="CadastroGeral">
                    <div >
                        <form className="form__CadastroGeral" onSubmit={this.CadastrarConsulta.bind(this)}>
                             
                             
                                <select value={this.state.idPaciente} onChange={this.atualizaEstadoIdPaciente.bind(this)}>
                                    <option >Nome do Paciente</option>
                                    {this.state.listaPacientes.map(element => {
                                        return (
                                            <option key={element.id} value={element.id}>
                                                {element.nome}
                                            </option>
                                        );
                                    })}
                                </select>
                            
                             
                                
                            <select value={this.state.idMedico} onChange={this.atualizaEstadoIdMedico.bind(this)}>
                                    <option >Nome do medico</option>
                                    {this.state.listaMedicos.map(element => {
                                        return (
                                            <option key={element.id} value={element.id}>
                                                {element.nome}
                                            </option>
                                        );
                                    })}

                                </select>
                            
                             
                                
                            <select value={this.state.statusConsulta} onChange={this.atualizaStatusConsulta.bind(this)}>
                                    <option>Selecione o status</option>
                                    <option value="Agendada">Agendada</option>
                                    <option value="Remarcada">Remarcada</option>


                                </select>
                            
                             
                               
                            <input  type="date" min={dataMinima}  placeholder="Data da Consulta" onChange={this.atualizaEstadoDataConsulta.bind(this)} value={this.state.dataConsulta} />

                            <input type="time" min="9:00" max="17:00" value={this.state.hora} onChange={this.atualizaEstadoHora.bind(this)} />
                            
                             
                                
                            <  textarea placeholder="Digite a descrição caso necessario" onChange={this.atualizaStatusDescricao.bind(this)} value={this.state.descricao} style={{ resize: "none" }}></textarea>
                            
                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                    <div>
                    <table className="rtable">
                        <thead>
                            <tr>
                                <th>ID consulta</th>
                                    <th>data da Consulta</th>
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
            </div>
        )
    }
}
