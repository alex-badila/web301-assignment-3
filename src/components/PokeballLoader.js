import SpinningImage from "./SpinningImage";
import pokeball from '../assets/pokeball.png';

// Make a loader that looks like a spinning Pokeball
const PokeballLoader = () => {
    return (
            <SpinningImage>
                {/* Pokeball image link: https://pixabay.com/vectors/pokemon-pokeball-pokemon-go-1536849/ */}
                <img src={pokeball} length="100" width="100" />
                {/* This is to tell visually impaired users that it is loading */}
                <span className="visually-hidden">Loading...</span>
            </SpinningImage>
    );
}

export default PokeballLoader;