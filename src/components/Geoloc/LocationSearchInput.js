import React from 'react';
import Axios from "axios"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './Localizacao.css'

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    address: '', 
    geoLoc:""
   };
  }
  CadastrarLocalizacao(event) {
    event.preventDefault();
    Axios.post("http://localhost:5000/api/Localizacoes", {
        latitude: this.state.geoLoc.lat,
        longitude: this.state.geoLoc.lng,
        
    }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('usuario-spmedgroup')
            }
        })
        .then(data => {
            if (data.status === 200) {
                // Alerta de Sucesso
                alert("Localização cadastrada com sucesso !");
            }
        })
        
}

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({geoLoc : latLng},() => {
        console.log(this.state.geoLoc)
      }))
      
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <div>

      
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="Demo__search-bar-container">
            <input
              {...getInputProps({
                placeholder: 'Digite o endereço...',
                className: 'Demo__search-input',
              })}
            />
            <div className="Demo__autocomplete-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = "Demo__suggestion-item".active
                  ? 'suggestion-item--active'
                  
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#dfe1e5', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div style ={{backgroundColor:"red"}}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span onMouseOver={suggestion.active && (() => this.setState({address : suggestion.description},() => {
                      console.log(this.state.address)
                    })) }>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <button className="btn__CadastrarLocalizacao" onClick={this.CadastrarLocalizacao.bind(this)}> Enviar</button>
      </div>
    );
  }
}
