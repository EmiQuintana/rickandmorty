import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import logo from './img/logo.png';
import ClipLoader from "react-spinners/ClipLoader";


function CharacterCard(props) {
  const { character } = props;
  

  return (
    <div
      className="CharacterCard"
      style={{ backgroundImage: `url(${character.image})` }}
    >
      <div className="CharacterCard__name-container text-truncate">
        {character.name}
      </div>
    </div>
  );
}

class App extends React.Component {
  state = {
    nextPage: 1,
    loading: true, 
    error: null,
    data: {
      results: [],
    },
  }
  componentDidMount() {
    this.fetchCharacters()
  }

  fetchCharacters = async() => {
    this.setState({ loading: true, error: null })
    

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${this.state.nextPage}`)
      const data = await response.json();
  
      this.setState({
        loading: false,
        data: {
          info: data.info,
          results: [].concat(this.state.data.results, data.results)
        },
        nextPage: this.state.nextPage + 1,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render () {
    if (this.state.error) {
      return `Error: ${this.state.message}`;
    }

    return (
      <div className="container">
        <div className="App">
          <img className="Logo" src={logo} alt="Rick y morty" />

          <ul className="row">
            {this.state.data.results.map(character => (
              <li className="col-6 col-md-3" key={character.id}>
                <CharacterCard character={character} />
              </li>
            )) }
          </ul>
          

          {this.state.loading && (
            <div className="sweet-loading">  
            <ClipLoader size={150} color={"#123abc"} loading={this.state.loading} speedMultiplier={2.5} />
          </div>
          )}

          {!this.state.loading && (
            <button onClick={() => this.fetchCharacters()}>Load More</button>
          )}
        </div>
      </div>

    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);