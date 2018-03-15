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
        console.log(url);
        axios.get(url)
            .then(
                response => {
                    const results = response.data.results;
                    console.log(results);
                    let artists = {};
                    for (const item of results) {
                        if (artists.artistId !== item.artistName)
                            artists[item.artistId] = item.artistName;
                    }
                    artists = Object.entries(artists);
                    this.setState({ artists: artists, albums: null });
                    console.log(artists);
                },
                error => alert(error)
            )

    }
    showAlbums = artist => {
        const artistId = encodeURIComponent(artist[0]);
        const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=album`;
        axios.get(url)
            .then(
                response => {
                    console.log(response);
                    this.setState({ albums: response.data.results, artists: null })
                },
                error => alert(error)
            )
    }

    render() {
        return (
            <div>
                <div>
                    <label>
                        <span className='label'>Search by Artist</span>
                        <br />
                        <input 
                            type='text' 
                            placeholder='Enter Artist Name' 
                            value={this.state.artistName} 
                            onChange={this.artistInput} 
                        />
                    </label>
                    <button type='button' onClick={this.findAlbums}>Search</button>
                </div>
                <div className='artist'>
                    {
                        this.state.artists  &&
                        <div>
                            {
                                this.state.artists.map(([artistId, artistName], index) => (
                                    <div key={artistId}>
                                        <a 
                                            href="javascript:;" 
                                            onClick={() => this.showAlbums([artistId, artistName])}
                                        >
                                            {artistName}
                                        </a>
                                    </div>

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
                            <div key={index} className='album'>
                                <img 
                                    src={album.artworkUrl100} 
                                    alt={album.collectionName}
                                />
                                <a 
                                    href={album.collectionViewUrl}
                                >
                                    {album.collectionName}
                                </a>

                            </div>
                        )
                    }
                </div>
            </div>

        )
    }
}

export default Search; 