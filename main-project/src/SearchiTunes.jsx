import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Search extends React.Component{
    state = {
        didMount: false,
        artistName: ''
    }
    artistInput = input => this.setState({artistName: input.target.value});
    findAlbums = () => {
        const artistName = this.state.artistName.split(" ").join("+");
        const url = `https://itunes.apple.com/search?term=${artistName}`;
        console.log(url);
        //const ARTIST_NAME = this.state.artistName;
        const getAlbumsByArtist = axios.get(url)
        getAlbumsByArtist.then(
            response => {
                const results = response.data.results;
                console.log(results);
                const artists = {};
                for(let item of results){
                    if(artists.artistId != item.artistName)
                        artists[item.artistId] = item.artistName;
                }
                console.log(artists);
            },
            error => console.log(error)
        )
    
    }
    


    // componentDidMount(){
    //     let ARTIST_NAME = this.state.artistName;
    //     const getAlbumsByArtist = axios.get('https://itunes.apple.com/search?term=${ARTIST_NAME}')

    // }
    

    render(){
        return(
            <div>
                <label>Search by Artist</label> <br />
                <input type='text' placeholder='The Beatles' value={this.state.artistName} onChange={this.artistInput} />
                <button type='button' onClick={this.findAlbums}>Search</button>
            </div>

        )
    }
}

export default Search; 