import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';


class Search extends React.Component {
    state = {
        didMount: false,
        artistName: ''
    }
    artistInput = input => this.setState({ artistName: input.target.value });
    findAlbums = () => {
        const artistName = this.state.artistName.split(" ").join("+");
        const url = `https://itunes.apple.com/search?term=${artistName}`;
        console.log(url);
        const getAlbumsByArtist = axios.get(url)
        getAlbumsByArtist.then(
            response => {
                const results = response.data.results;
                console.log(results);
                let artists = {};
                for (let item of results) {
                    if (artists.artistId != item.artistName)
                        artists[item.artistId] = item.artistName;
                }
                artists = Object.entries(artists);
                this.setState({ artists: artists, albums: null });
                console.log(artists);
            },
            error => console.log(error)
        )

    }
    showAlbums = artist => {
        const url = `https://itunes.apple.com/lookup?id=${artist[0]}&entity=album`;
        const getAlbums = axios.get(url);
        getAlbums.then(
            response => {
                console.log(response);
                //$('.artist').hide();
                this.setState({ albums: response.data.results, artists: null })
            },
            error => console.log(error)
        )

    }

    render() {
        return (
            <div>
                <div>
                    <label>Search by Artist</label> <br />
                    <input type='text' placeholder='The Beatles' value={this.state.artistName} onChange={this.artistInput} />
                    <button type='button' onClick={this.findAlbums}>Search</button>
                </div>
                <div className='artist'>
                    {
                        this.state.artists != null &&
                        <div>
                            {
                                this.state.artists.map((item, index) => (
                                    <div key={item[0]}>
                                        <a href="javascript:;" onClick={() => this.showAlbums(item)}><i>{item[1]}</i></a>
                                    </div>

                                ))
                            }

                        </div>
                    }
                </div>
                <div className='albums'>
                    {
                        this.state.albums != null &&
                        this.state.albums.map((item, index) =>
                            <div key={index}>
                                <img src={item.artworkUrl100} />
                                <a href="javascript:;" onClick={() => this.showAlbums(item)}><i>{item.collectionName}</i></a>

                            </div>
                        )

                    }


                </div>
            </div>

        )
    }
}

export default Search; 