import {Routes, Route} from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Pokemon from './pages/Pokemon';
import PokemonDetails from './pages/PokemonDetails';

function App() {

  const url = "/";

  return (
    <div className="App">
      {/* Display the header */}
      <div>
        <Header />
      </div>
      <br/>
      <div>
        <Routes>
          <Route path={url} element={<Pokemon />} />
          <Route path={`${url}/pokemon/:pokemonName`} element={<PokemonDetails />} />
        </Routes>
      </div>
      <br/>
      {/* Display the footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
