import React from 'react';
import axios from 'axios';


class Search extends React.Component {
    state = {
        didMount: false,
        artistName: ''
    };

    artistInput = input => this.setState({ artistName: input.target.value });

    findAlbums = () => {
        const artistName = encodeURIComponent(this.state.artistName);
        const url = `https://itunes.apple.com/search?term=${artistName}`;
        axios.get(url)
            .then(
            response => {
                const results = response.data.results;
                let artists = {};
                for (const item of results) {
                    if (artists.artistId !== item.artistName)
                        artists[item.artistId] = item.artistName;
                }
                artists = Object.entries(artists);
                this.setState({ artists: artists, albums: null });
            },
            error => this.setState({error: 'could not retrieve artist info'})
            )
    }
    showAlbums = artist => {
        const artistId = encodeURIComponent(artist[0]);
        const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=album`;
        axios.get(url)
            .then(
            response => {
                this.setState({ albums: response.data.results, artists: null })
            },
            error =>  this.setState({error: 'could not retrieve album info'})
            )
    }
    enterPressed = key => {
        if (key.charCode === 13) {
            this.findAlbums();
        }
    }
    render() {
        return (
            <div>

                <div className="search-container">
                    <label>
                        <span className='label'>Search by Artist</span>
                        <br />
                        <input
                            type='text'
                            placeholder='Enter Artist Name'
                            value={this.state.artistName}
                            onChange={this.artistInput}
                            onKeyPress={this.enterPressed}
                        />
                    </label>
                    <button type='button' onClick={this.findAlbums}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
                <span style={{color: 'red'}}>{this.state.error}</span>
                <div className='artists'>
                    {
                        this.state.artists &&
                        <div>
                            {
                                this.state.artists.map(([artistId, artistName], index) => (

                                    <a
                                        key={artistId} className='artist'
                                        href="javascript:;"
                                        onClick={() => this.showAlbums([artistId, artistName])}
                                    >
                                        {artistName}
                                    </a>
                                ))
                            }

                        </div>
                    }
                </div>
                <div className='albums'>
                    {
                        this.state.albums &&
                        this.state.albums.map((album, index) =>
                            album.collectionId &&
                            <a key={index}
                                href={album.collectionViewUrl}
                            >
                                <div className='album'>
                                    <img
                                        src={album.artworkUrl100}
                                        alt={album.collectionName}
                                    />
                                    {album.collectionName}
                                </div>
                            </a>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Search; 