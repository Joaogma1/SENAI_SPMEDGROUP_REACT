import React, { Component } from 'react'
import Axios from 'axios'
import Header from '../../components/Headers/Header'
import './pacientes.css'
export default class ListaPacientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaPacientes: []
        }
    }
    componentDidMount() {
        this.CarregarPacientes();
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

    render() {
        return (
            <div>
                <Header></Header>
                <div className="Div__table">
                    <table class="rtable">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Data de nascimento</th>
                                <th>RG</th>
                                <th>CPF</th>
                                <th>Endereco</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listaPacientes.map(Element => {
                                    return (
                                        <tr key={Element.id}>
                                            <td>{Element.nome}</td>
                                            <td>{Element.telefone}</td>
                                            <td>{Element.dataNascimento}</td>
                                            <td>{Element.rg}</td>
                                            <td>{Element.cpf}</td>
                                            <td>{Element.endereco}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
