import React, { Component } from 'react'
import Axios from 'axios'
import Header from '../../components/Headers/Header'
export default class ListaMed extends Component {
    constructor(props) {
        super(props);
        this.state= {
            listaMedicos: []
        }
    }
    componentDidMount(){
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
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CRM</th>
                    <th>Especialidade</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.listaMedicos.map(Element =>{
                        return(
                            <tr key={Element.id}>
                                <td>{Element.nome}</td>
                                <td>{Element.crm}</td>
                                <td>{Element.idEspecialidadeNavigation.nome}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      </div>
    )
  }
}
