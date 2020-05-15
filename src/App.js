import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const[details, setDetails] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = 
    useState(null);

  useEffect(() => {fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
  .then(response => response.json())
  .then(data => {console.log(data);
    setPokemon(data.results)});
    }, []);

  useEffect(() => {fetch("https://pokeapi.co/api/v2/pokemon/" + selectedPokemon)
  .then(response => response.json())
  .then(data => {console.log(data);
    setDetails(data)
      });
    }, [selectedPokemon]);
  
  return (
    <div className="App">
      <div className = "pokedex">
        <ul className = "pokedex-list">
          {pokemon.map(obj => <li key = {obj.name}>
            <button className = { obj.name === selectedPokemon
              ?"active":"" }
            onClick = {() => {setSelectedPokemon(obj.name);
            }}> {obj.name}</button>
          </li>)}
        </ul>
        <Image src = {details != null ? 
          details.sprites.front_default : ""}/>
      </div>
    </div>
  );
}

function Image(props) {
  if (!props.src) {
    return null;
  }

  return <div className="pokedex-image"> <img src = 
  {props.src} /></div>
}

export default App;
