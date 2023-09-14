import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';

import PokeballLoader from '../components/PokeballLoader';

const PokemonDetails = () => {

    // Create a state for the PokemonDetails data
    const [pokemonDetails, setPokemonDetails] = useState([]);

    // Create a state that will tell you if the page is loading or not
    const [loading, setLoading] = useState(true);

    // Create a state to catch any errors that might come through from the request
    const [requestError, setRequestError] = useState(undefined);

    // Set a max timeout for loading
    const maxTimeout = 1500;

    // Extract the parameter from the URL that uniquely
    // identifies the Pokemon in question (its name)
    const {pokemonName} = useParams();

    // Call the Poke API when the PokemonDetails component mounts
    useEffect(() => {
        // Set the timeout so the page has enough time to load to retrieve the information
        // Also used to avoid screen flickering
        setTimeout(() => {
            // Make a GET request to receive the details for the 
            // corresponding Pokemon using its name
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => {
                    // For a successful response, update the pokemonDetails state variable
                    // to the data that was received from the request 
                    const {data} = response;
                    setPokemonDetails(data);

                    // Set the loading state to false, since the data has been retrieved
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

    // Display the information of the Pokemon
    // and the Back button
    return(
        <div>
            {/* If it's still loading, display the Pokeball loader */}
            {loading && (
                <PokeballLoader />
            )}

            {/* If it's not loading anymore and there is an error, display the error message */}
            {!loading && requestError && (
                <div>
                    <p className="lead text-danger">{requestError}</p>
                    <br/>

                    {/* Display the Back button, that takes the user back to the previous page */}
                    <Link to="/" className="btn btn-primary">Go Back</Link>
                </div>
            )}

            {/* If it's not loading anymore, no error has occured, and the extracted data is empty, display an error message */}
            {/* Needed to use Object.keys() method to check the length of the extracted data, */}
            {/* since pokemonDetails is an object, and therefore doesn't have a length property  */}
            {!loading && !requestError && (Object.keys(pokemonDetails).length === 0) && (
                <div>
                    <p className="lead">There is no information to display for this Pokemon. Mysterious!</p>
                    <br/>

                    {/* Display the Back button, that takes the user back to the previous page */}
                    <Link to="/" className="btn btn-primary">Go Back</Link>
                </div>              
            )}

            {/* If it's not loading anymore, no error has occured, and the extracted data is not empty, display the page */}
            {/* Needed to use Object.keys() method to check the length of the extracted data, */}
            {/* since pokemonDetails is an object, and therefore doesn't have a length property  */}
            {!loading && !requestError && (Object.keys(pokemonDetails).length > 0) && (
                <div>
                    {/* Display the Pokemon's name */}
                    {/* Make sure to capitalize it */}
                    <h2>{pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</h2>

                    {/* Display its image (sprite) */}
                    {/* Decided to use the front_default sprite */}
                    {/* Seemed to be the most appropriate one */}
                    <img src={pokemonDetails.sprites.front_default} />

                    {/* Display the table of its stats */}
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Stat</th>
                                <th>Value</th>
                            </tr>                           
                        </thead>
                        <tbody>
                            {pokemonDetails.stats.map((pokemonDetailsStat) => 
                                (
                                    // Use the name of the stat as the key for the row
                                    // The name is unique for each stat
                                    <tr key={pokemonDetailsStat.stat.name}>
                                        {/* Capitalize the name so it looks better */}
                                        <td>{pokemonDetailsStat.stat.name.toUpperCase()}</td>
                                        <td>{pokemonDetailsStat.base_stat}</td>
                                    </tr>
                                )
                            )} 
                        </tbody>
                    </table>

                    {/* Display the Back button, that takes the user back to the previous page */}
                    <Link to="/" className="btn btn-primary">Go Back</Link>
                </div>                
            )}    
        </div>
    );

}

export default PokemonDetails;