import React, { Component } from 'react'
import Axios from 'axios'
import Header from '../../components/Headers/Header'
import "./Medicos.css"
export default class ListaMed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaMedicos: []
        }
    }
    componentDidMount() {
        this.CarregarMedicos();
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


    render() {
        return (
            <div>
                <Header></Header>
                <div className="Container__Medicos">

                    {
                        this.state.listaMedicos.map(Element => {
                            return (
                                <div className="Content__Medicos" key={Element.id}>
                                    <div>
                                    <label>Nome: <h3>{Element.nome}</h3></label>
                                    <label>CRM: <h3>{Element.crm}</h3></label>
                                    <label>Especialidade: <h3>{Element.idEspecialidadeNavigation.nome}</h3></label>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
