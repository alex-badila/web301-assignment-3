import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import PokeballLoader from '../components/PokeballLoader';
import PokemonCard from '../components/PokemonCard';
import GridWrapper from '../components/GridWrapper';

import pokeball from '../assets/pokeball.png';
import pokedex from '../assets/pokedex.jpg';

const Pokemon = () => {

    // Create a state for the Pokemon data
    const [pokemon, setPokemon] = useState([]);

    // Create a state that will tell you if the page is loading or not
    const [loading, setLoading] = useState(true);

    // Create a state to catch any errors that might come through from the request
    const [requestError, setRequestError] = useState(undefined);

    // Set a max timeout for loading
    const maxTimeout = 1500;

    // Call the Poke API when the Pokemon component mounts
    useEffect(() => {
        // Set the timeout so the page has enough time to load to retrieve the information
        // Also used to avoid screen flickering
        setTimeout(() => {
            // Do a GET request for the first 151 Pokemon from the Poke API
            axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then((response) => {
                    // For a successful response, update the pokemon state variable
                    // to the data that was received from the request
                    const {data} = response;
                    setPokemon(data.results);

                    // Set the loading state to false, since the data has been retrieved
                    // and there is no need to load anymore
                    setLoading(false);
                })
            .catch((error) => {
                    // If an error occurs, extract the details of the error
                    const {status, data} = error.response;

                    // Update the error state with the extracted information
                    setRequestError(`${status} ${data}`);

                    // Set the loading state to false, since an error has occurred 
                    // and there is no need to load anymore
                    setLoading(false);
                });

        }, maxTimeout);
    }, []);

    return(
        <div>
            {/* If it's still loading, display the Pokeball loader */}
            {loading && (
                <PokeballLoader />
            )}

            {/* If it's not loading anymore and there is an error, display the error message */}
            {!loading && requestError && (
                <p className="lead text-danger">{requestError}</p>
            )}

            {/* If it's not loading anymore, no error has occured, and the extracted data is empty, display an error message */}
            {!loading && !requestError && (pokemon.length === 0) && (
                <p className="lead">There are no Pokemon to display. Professor Oak must be slacking off!</p>
            )}

            {/* If it's not loading anymore, no error has occured, and the extracted data is not empty, display the page */}
            {!loading && !requestError && (pokemon.length > 0) && (
                <div>
                    {/* Home page introduction */}
                    <h2>Welcome to the Online Pokedex!</h2>
                    <br/>
                    {/* Pokedex image link: https://pixabay.com/illustrations/pokedex-pokemon-pokeball-video-game-5593125/ */}
                    <img src={pokedex} length="300" width="300" />
                    <br/>
                    <br/>
                    <p className="lead">Your one-stop shop for information on the first 151 Pokemon!</p>
                    <br/>
                    {/* Create a grid displaying each Pokemon's name in a square card */}
                    <GridWrapper>
                        {pokemon.map(singlePokemon => (
                                // Display each Pokemon name as a square in a grid
                                // Use the name as the key, since it is unique for every Pokemon
                                // Also link it to the corresponding PokemonDetails page
                                <Link to={`/pokemon/${singlePokemon.name}`} key={singlePokemon.name} style={{textDecoration: 'none'}}>
                                    <PokemonCard>
                                        {/* Make sure to capitalize the name */}
                                        {singlePokemon.name.charAt(0).toUpperCase() + singlePokemon.name.slice(1)}
                                        <br/>
                                        <br/>
                                        {/* Add the image of a Pokeball for each square */}
                                        {/* Pokeball image link: https://pixabay.com/vectors/pokemon-pokeball-pokemon-go-1536849/ */}
                                        <img src={pokeball} length="100" width="100" />
                                    </PokemonCard>
                                </Link>
                            ))
                        }
                    </GridWrapper>
                </div>
                
            )}
        </div>
    );
}

export default Pokemon;