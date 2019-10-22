/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import api from '../../services/api';
import { FaHeadphones } from 'react-icons/fa';

import './styles.css'


export default class Main extends Component {
    
    state = {
        track: [],
        songs: [],
        artistName:[],
        artistId:null,
        temArtista: false,
        artista:'Alanis Morissette',
        width: window.innerWidth,
        desck:false,
        dadosOK: true,
        artistImg: '',
    }
    

    componentWillDidMount() {
  
  if (this.state.width <= 500){
      this.setState({ desck: false });
  }

}



    componentWillMount() {
  window.addEventListener('resize', this.handleWindowSizeChange);
}

// make sure to remove the listener
// when the component is not mounted anymore
componentWillUnmount() {
  window.removeEventListener('resize', this.handleWindowSizeChange);
}

handleWindowSizeChange = () => {
  this.setState({ width: window.innerWidth });
};



    getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }

handleInputChange = e => {
    this.setState({ artista: e.target.value });
}

handleSubmit = e => {
    e.preventDefault();
    this.loadArtists()
    this.setState({ temArtista: true });
}

    loadSongs = async () => {
        

        const response = await api.get(`/lookup?id=${this.state.artistId}&limit=5000&entity=song`);
        const result = this.getUnique(response.data.results,'trackId')//trackName
        const result2 = this.getUnique(result,'trackName')

        this.setState({songs: result2});
        this.setState({dadosOK: false});
        //console.log(this.state.songs);
    }


    loadArtists = async () => {
        //const response = await api.get(`/search?term=Alanis+morissette&limit=1000&entity=song`); apenas para teste

        const response = await api.get(`/search?term=${this.state.artista}&limit=800&entity=album`);
        const result = this.getUnique(response.data.results,'collectionId')
        const result2 = this.getUnique(result,'collectionName')

        this.setState({track: result2});
        this.setState({artistName: result[0].artistName});
        this.setState({artistId: result[0].artistId});
        this.setState({artistImg: result[0].artworkUrl100});
        this.loadSongs();
    };

    

  

    render() {
        const { desck } = this.state;
        const { artista } = this.state;
        
        return (
            <>
                <div className="container">
                { this.state.dadosOK && 
                 <FaHeadphones color="#0a657a" size= {150}  />
                }
                 { this.state.dadosOK ? (
                     <div className="content">
                    
                        <p>
                            Digite o nome de um <strong>Artista</strong> ou 
                            <strong>Banda</strong> que deseja pesquisar
                        </p>
                     
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="artista">ex.</label>
                            <input 
                            type="artista" 
                            id="email"
                            plceholder="ex. Alanis Morissette"
                            value={artista}
                            onChange={this.handleInputChange}
                            />
                            <button className="btn"  type="submit">Pesquisar</button>
                        </form>

                        
                    </div>
                 ) : (
                     <div className="container">
                      <img src={this.state.artistImg} />
                        <p>
                            <strong>{this.state.artistName}</strong>
                        </p>
                        </div>
                 )}

                    
                </div>

                <div className="containerGrande">

                         { this.state.temArtista &&
                         <p>
                            <strong>LISTA DE ALBUMS</strong>
                         </p>
                         }
                         { this.state.width >= 500 ? (
                         <ul className="artist">
                            {this.state.track.map(track => ( 
                                <li key={track.collectionId}>
                                    <img src={track.artworkUrl60}  />                       
                                    <div className="divlinhas" >
                                        <span>{track.collectionName}</span>
                                        <strong>{track.primaryGenreName}</strong>
                                    </div>
                                </li>
                            ))}
                         </ul>
                         ) : (
                         <ul className="musicMobile">
                            {this.state.track.map(track => ( 
                                <li key={track.collectionId}>
                                 <coluna>
                            <div>
                            <img src={track.artworkUrl60} />
                                         </div>
                                        <div className="divlinhas" >
                                        <span>{track.collectionName}</span>
                                    <strong>{track.primaryGenreName}</strong>
                                   

                            </div>
                            </coluna>

                                   
                                </li>
                            ))}
                         </ul>
                         )
                         }

                         
                          { this.state.temArtista &&
                         <p>
                            <strong>LISTA DE MUSICAS</strong>
                         </p>
                         }
                         
                         <ul className="music">            
                    {this.state.songs.reverse().map(song => (              
                        <li key={song.trackId}>
                            <coluna>
                            <div>
                            <img src={song.artworkUrl30}  />
                            </div>
                            { this.state.width >= 500 ? (
                            <div className="divlinhasMisic" >
                            <span>{song.trackName}</span>
                             <strong>{(((song.trackTimeMillis)/60).toString()).substr(0, 1)}:{(((song.trackTimeMillis)/60).toString()).substr(0, 2)}</strong>
                            </div>
                            ) : (
                            <div className="divlinhasMobile" >
                            <span>{song.trackName} </span>
                             <strong>{(((song.trackTimeMillis)/60).toString()).substr(0, 1)}:{(((song.trackTimeMillis)/60).toString()).substr(0, 2)}</strong>
                            </div>
                         )}
                            </coluna>
                        </li>
                    ))}

                         </ul>
                         

                </div>

                </>
        );
       
  
    }
    
}

//artworkUrl100 imagem do album tamanho 100x100
//collectionName nome do album
//artistName nome do artista
