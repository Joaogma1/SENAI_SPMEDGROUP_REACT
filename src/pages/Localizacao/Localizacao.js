import React, { Component } from 'react'
import Header from '../../components/Headers/Header'
import GeoLocalizacaoInput from "../../components/Geoloc/LocationSearchInput"

export default class Localizacao extends Component {
    constructor(props) {
        super(props);
        this.state ={
           
        }
    }
    
    render() {
        return (
            <div>
                <Header/>
                <GeoLocalizacaoInput/>
            </div>
        )
    }
}
