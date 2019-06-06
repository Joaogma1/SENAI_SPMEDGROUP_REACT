import React, { Component } from 'react'
import Header from '../../components/Headers/Header'
import GeoLocalizacao from "../../components/Geoloc/LocationSearchInput"

export default class Localizacao extends Component {

    render() {
        return (
            <div>
                <Header/>
                <GeoLocalizacao/>
            </div>
        )
    }
}
