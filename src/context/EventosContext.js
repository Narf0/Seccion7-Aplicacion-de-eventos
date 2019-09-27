import React, { Component } from 'react';
import axios from 'axios';

const EventosContext = React.createContext();
export const EventosConsumer = EventosContext.Consumer;

class EventosProvider extends Component {
    state = { 
        eventos : []
    }

    token = 'EJG6QL6S2JVQSZQ7WB5Z';
    ordenar = "date";

    obtenerEventos = async (busqueda) => {
        let url = `https://www.eventbriteapi.com/v3/events/search/?q=${busqueda.nombre}&categories=${busqueda.categoria}&sort_by=${this.ordenar}&token=${this.token}&locale=es_ES`;
    
        // consular la API con la URL
        const eventos = await axios(url);

        console.log(eventos);
        this.setState({
            eventos: eventos.data.events
        })

    }
    render() {
        return ( 
            <EventosContext.Provider
                value={{
                    eventos: this.state.eventos,
                    obtenerEventos : this.obtenerEventos
                }}>
                {this.props.children}
            </EventosContext.Provider>
        );
    }
}

export default EventosProvider;